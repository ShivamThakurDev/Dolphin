using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Dolphin.Application.Common;
using Dolphin.Domain.Identity;
using Dolphin.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Dolphin.Infrastructure.Security;

public sealed class PasswordHasher : IPasswordHasher
{
    public string Hash(string password) => BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12);
    public bool Verify(string password, string passwordHash) => BCrypt.Net.BCrypt.Verify(password, passwordHash);
}

public sealed class JwtTokenService(DolphinDbContext dbContext, IPasswordHasher passwordHasher, IConfiguration configuration) : IJwtTokenService
{
    public async Task<AuthResult> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        var tenant = await dbContext.Tenants.IgnoreQueryFilters().FirstOrDefaultAsync(t => t.Slug == (request.TenantSlug ?? "demo"), cancellationToken)
            ?? throw new UnauthorizedAccessException("Tenant was not found.");
        var user = await dbContext.Users.IgnoreQueryFilters().FirstOrDefaultAsync(u => u.TenantId == tenant.Id && u.Email == request.Email.ToLower(), cancellationToken)
            ?? throw new UnauthorizedAccessException("Invalid email or password.");

        if (!user.IsActive || !passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        return await IssueTokensAsync(user, ["TenantAdmin", "HRAdmin", "Employee"], request.DeviceName, cancellationToken);
    }

    public async Task<AuthResult> RefreshAsync(RefreshTokenRequest request, CancellationToken cancellationToken = default)
    {
        var hash = HashToken(request.RefreshToken);
        var stored = await dbContext.RefreshTokens.IgnoreQueryFilters().FirstOrDefaultAsync(t => t.TokenHash == hash, cancellationToken)
            ?? throw new UnauthorizedAccessException("Refresh token is invalid.");

        if (!stored.IsActive)
        {
            throw new UnauthorizedAccessException("Refresh token has expired or was revoked.");
        }

        var user = await dbContext.Users.IgnoreQueryFilters().FirstAsync(u => u.Id == stored.UserId, cancellationToken);
        stored.RevokedAt = DateTimeOffset.UtcNow;
        return await IssueTokensAsync(user, ["TenantAdmin", "HRAdmin", "Employee"], request.DeviceName, cancellationToken);
    }

    private async Task<AuthResult> IssueTokensAsync(User user, IReadOnlyCollection<string> roles, string? deviceName, CancellationToken cancellationToken)
    {
        var expires = DateTimeOffset.UtcNow.AddMinutes(GetInt("Jwt:AccessTokenMinutes", 30));
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:SigningKey"] ?? "dev-only-signing-key-change-me-change-me"));
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new("tenant_id", user.TenantId.ToString()),
            new(ClaimTypes.Name, user.DisplayName)
        };
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"] ?? "dolphin",
            audience: configuration["Jwt:Audience"] ?? "dolphin-web",
            claims: claims,
            expires: expires.UtcDateTime,
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        var refreshToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        var tokenEntity = user.AddRefreshToken(HashToken(refreshToken), DateTimeOffset.UtcNow.AddDays(GetInt("Jwt:RefreshTokenDays", 14)), deviceName, null);
        await dbContext.RefreshTokens.AddAsync(tokenEntity, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new AuthResult(new JwtSecurityTokenHandler().WriteToken(token), refreshToken, expires,
            new UserProfileDto(user.Id, user.TenantId, user.Email, user.DisplayName, roles));
    }

    private int GetInt(string key, int fallback) => int.TryParse(configuration[key], out var value) ? value : fallback;
    private static string HashToken(string token) => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token)));
}
