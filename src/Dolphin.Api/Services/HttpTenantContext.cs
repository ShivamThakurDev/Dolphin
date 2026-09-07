using System.Security.Claims;
using Dolphin.Application.Common;

namespace Dolphin.Api.Services;

public sealed class HttpTenantContext(IHttpContextAccessor accessor) : ITenantContext
{
    private static readonly Guid DemoTenantId = Guid.Parse("11111111-1111-1111-1111-111111111111");

    public Guid TenantId
    {
        get
        {
            var context = accessor.HttpContext;
            var headerTenant = context?.Request.Headers["X-Tenant-Id"].FirstOrDefault();
            var claimTenant = context?.User.FindFirstValue("tenant_id");
            return Guid.TryParse(headerTenant ?? claimTenant, out var tenantId) ? tenantId : DemoTenantId;
        }
    }

    public string? UserId => accessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? accessor.HttpContext?.User.FindFirstValue("sub");

    public string? UserEmail => accessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email)
        ?? accessor.HttpContext?.User.FindFirstValue("email");
}

public sealed class CurrentUserService(IHttpContextAccessor accessor) : ICurrentUserService
{
    public string UserId => accessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? accessor.HttpContext?.User.FindFirstValue("sub")
        ?? "anonymous";

    public string Email => accessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email)
        ?? accessor.HttpContext?.User.FindFirstValue("email")
        ?? "anonymous@dolphin.local";

    public IReadOnlyCollection<string> Roles => accessor.HttpContext?.User.FindAll(ClaimTypes.Role).Select(x => x.Value).ToList() ?? [];
}
