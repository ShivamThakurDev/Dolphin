using Asp.Versioning;
using Dolphin.Application.Common;
using Dolphin.Application.Identity;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Api.Controllers;

[ApiVersion(1)]
[Authorize]
[Route("api/v{version:apiVersion}/users")]
[Route("api/v{version:apiVersion}/User")]
public sealed class UsersController(ISender sender) : ApiControllerBase(sender)
{
    [HttpGet]
    [HttpGet("all")]
    [HttpGet("GetAll")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<UserItemDto>>>> GetAll(CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new ListUsersQuery(), cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<UserItemDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var user = await Sender.Send(new GetUserByIdQuery(id), cancellationToken);
        return user is null ? NotFoundResponse<UserItemDto>("User was not found.") : OkResponse(user);
    }

    [HttpPost]
    [HttpPost("Register")]
    public async Task<ActionResult<ApiResponse<UserItemDto>>> Register([FromBody] CreateUserRequest request, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new CreateUserCommand(request), cancellationToken));

    [HttpPost("assign-role")]
    [HttpPost("AssignRole")]
    public async Task<ActionResult<ApiResponse<bool>>> AssignRole([FromBody] AssignRoleRequest request, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new AssignRoleCommand(request), cancellationToken));

    [HttpPut("{id:guid}")]
    [HttpPut("Edit/{id:guid}")]
    public async Task<ActionResult<ApiResponse<UserItemDto>>> Update(Guid id, [FromBody] UpdateUserRequest request, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new UpdateUserCommand(id, request), cancellationToken));

    [HttpDelete("{id:guid}")]
    [HttpDelete("Delete/{id:guid}")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(Guid id, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new DeleteUserCommand(id), cancellationToken));
}
