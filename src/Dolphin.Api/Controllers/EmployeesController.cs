using Asp.Versioning;
using Dolphin.Application.Common;
using Dolphin.Application.Hrms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Api.Controllers;

[ApiVersion(1)]
[Authorize]
public sealed class EmployeesController(ISender sender) : ApiControllerBase(sender)
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<PagedResult<EmployeeDto>>>> List([FromQuery] PagedRequest page, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new ListEmployeesQuery(page), cancellationToken));

    [HttpPost]
    [Authorize(Policy = "HrAdmin")]
    public async Task<ActionResult<ApiResponse<EmployeeDto>>> Create(CreateEmployeeRequest request, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new CreateEmployeeCommand(request), cancellationToken));
}
