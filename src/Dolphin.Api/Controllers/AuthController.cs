using Asp.Versioning;
using Dolphin.Application.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Api.Controllers;

[ApiVersion(1)]
public sealed class AuthController(IJwtTokenService jwtTokenService, ISender sender) : ApiControllerBase(sender)
{
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<AuthResult>>> Login(LoginRequest request, CancellationToken cancellationToken) =>
        OkResponse(await jwtTokenService.LoginAsync(request, cancellationToken));

    [AllowAnonymous]
    [HttpPost("refresh")]
    public async Task<ActionResult<ApiResponse<AuthResult>>> Refresh(RefreshTokenRequest request, CancellationToken cancellationToken) =>
        OkResponse(await jwtTokenService.RefreshAsync(request, cancellationToken));

    [Authorize]
    [HttpGet("me")]
    public ActionResult<ApiResponse<object>> Me() => OkResponse<object>(new
    {
        User.Identity?.Name,
        Roles = User.Claims.Where(c => c.Type.EndsWith("role", StringComparison.OrdinalIgnoreCase)).Select(c => c.Value)
    });
}
