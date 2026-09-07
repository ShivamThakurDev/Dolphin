using Asp.Versioning;
using Dolphin.Application.Common;
using Dolphin.Application.Identity;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Api.Controllers;

[ApiVersion(1)]
[Authorize]
[Route("api/v{version:apiVersion}/roles")]
[Route("api/v{version:apiVersion}/Role")]
public sealed class RolesController(ISender sender) : ApiControllerBase(sender)
{
    [HttpGet]
    [HttpGet("all")]
    [HttpGet("GetAll")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<RoleItemDto>>>> GetAll(CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new ListRolesQuery(), cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<RoleItemDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var role = await Sender.Send(new GetRoleByIdQuery(id), cancellationToken);
        return role is null ? NotFoundResponse<RoleItemDto>("Role was not found.") : OkResponse(role);
    }

    [HttpPost]
    [HttpPost("Add")]
    public async Task<ActionResult<ApiResponse<RoleItemDto>>> Create([FromBody] CreateRoleRequest request, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new CreateRoleCommand(request), cancellationToken));

    [HttpPut("{id:guid}")]
    [HttpPut("Edit/{id:guid}")]
    public async Task<ActionResult<ApiResponse<RoleItemDto>>> Update(Guid id, [FromBody] UpdateRoleRequest request, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new UpdateRoleCommand(id, request), cancellationToken));

    [HttpDelete("{id:guid}")]
    [HttpDelete("Delete/{id:guid}")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(Guid id, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new DeleteRoleCommand(id), cancellationToken));
}
