using Dolphin.Domain.Common;

namespace Dolphin.Domain.Identity;

public sealed class Tenant : AuditableEntity, IAggregateRoot
{
    private readonly List<Role> _roles = [];
    private readonly List<User> _users = [];

    private Tenant() { }

    public Tenant(string name, string slug, string primaryDomain)
    {
        Name = name;
        Slug = slug;
        PrimaryDomain = primaryDomain;
    }

    public string Name { get; private set; } = string.Empty;
    public string Slug { get; private set; } = string.Empty;
    public string PrimaryDomain { get; private set; } = string.Empty;
    public string PlanCode { get; set; } = "startup";
    public bool IsActive { get; set; } = true;
    public IReadOnlyCollection<Role> Roles => _roles;
    public IReadOnlyCollection<User> Users => _users;
}

public sealed class User : TenantEntity, IAggregateRoot
{
    private readonly List<UserRole> _roles = [];
    private readonly List<RefreshToken> _refreshTokens = [];

    private User() { }

    public User(Guid tenantId, string email, string displayName, string passwordHash)
    {
        TenantId = tenantId;
        Email = email.Trim().ToLowerInvariant();
        DisplayName = displayName;
        PasswordHash = passwordHash;
    }

    public string Email { get; private set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public Guid? EmployeeId { get; set; }
    public IReadOnlyCollection<UserRole> Roles => _roles;
    public IReadOnlyCollection<RefreshToken> RefreshTokens => _refreshTokens;

    public void AddRole(Guid roleId) => _roles.Add(new UserRole(TenantId, Id, roleId));
    public RefreshToken AddRefreshToken(string tokenHash, DateTimeOffset expiresAt, string? deviceName, string? ipAddress)
    {
        var token = new RefreshToken(TenantId, Id, tokenHash, expiresAt, deviceName, ipAddress);
        _refreshTokens.Add(token);
        return token;
    }
}

public sealed class Role : TenantEntity
{
    private readonly List<RolePermission> _permissions = [];

    private Role() { }

    public Role(Guid tenantId, string name, string description)
    {
        TenantId = tenantId;
        Name = name;
        Description = description;
    }

    public string Name { get; private set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public IReadOnlyCollection<RolePermission> Permissions => _permissions;
}

public sealed class Permission : AuditableEntity
{
    private Permission() { }
    public Permission(string code, string description) { Code = code; Description = description; }
    public string Code { get; private set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public sealed class UserRole : TenantEntity
{
    private UserRole() { }
    public UserRole(Guid tenantId, Guid userId, Guid roleId) { TenantId = tenantId; UserId = userId; RoleId = roleId; }
    public Guid UserId { get; private set; }
    public Guid RoleId { get; private set; }
}

public sealed class RolePermission : TenantEntity
{
    private RolePermission() { }
    public RolePermission(Guid tenantId, Guid roleId, Guid permissionId) { TenantId = tenantId; RoleId = roleId; PermissionId = permissionId; }
    public Guid RoleId { get; private set; }
    public Guid PermissionId { get; private set; }
}

public sealed class RefreshToken : TenantEntity
{
    private RefreshToken() { }
    public RefreshToken(Guid tenantId, Guid userId, string tokenHash, DateTimeOffset expiresAt, string? deviceName, string? ipAddress)
    {
        TenantId = tenantId;
        UserId = userId;
        TokenHash = tokenHash;
        ExpiresAt = expiresAt;
        DeviceName = deviceName;
        IpAddress = ipAddress;
    }

    public Guid UserId { get; private set; }
    public string TokenHash { get; private set; } = string.Empty;
    public DateTimeOffset ExpiresAt { get; private set; }
    public DateTimeOffset? RevokedAt { get; set; }
    public string? ReplacedByTokenHash { get; set; }
    public string? DeviceName { get; private set; }
    public string? IpAddress { get; private set; }
    public bool IsActive => RevokedAt is null && ExpiresAt > DateTimeOffset.UtcNow;
}
