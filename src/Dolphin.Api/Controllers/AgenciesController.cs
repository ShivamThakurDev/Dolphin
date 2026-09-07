using Asp.Versioning;
using Dolphin.Application.Common;
using Dolphin.Application.Projects;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Api.Controllers;

[ApiVersion(1)]
[Authorize]
public sealed class AgenciesController(ISender sender) : ApiControllerBase(sender)
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<PagedResult<AgencyDto>>>> List([FromQuery] PagedRequest page, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new GetAgenciesQuery(page), cancellationToken));

    [HttpGet("all")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<AgencyDto>>>> GetAll(CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new GetAllAgenciesQuery(), cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<AgencyDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var agency = await Sender.Send(new GetAgencyByIdQuery(id), cancellationToken);
        if (agency is null)
            return NotFound(ApiResponse<AgencyDto>.Fail([new ApiError("NotFound", $"Agency with ID '{id}' was not found.")]));
        return OkResponse(agency);
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<AgencyDto>>> Create([FromBody] CreateAgencyRequest request, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new CreateAgencyCommand(request), cancellationToken));

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<AgencyDto>>> Update(Guid id, [FromBody] UpdateAgencyRequest request, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new UpdateAgencyCommand(id, request), cancellationToken));

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(Guid id, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new DeleteAgencyCommand(id), cancellationToken));
}
