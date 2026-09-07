using Asp.Versioning;
using Dolphin.Application.Common;
using Dolphin.Application.Hrms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Api.Controllers;

[ApiVersion(1)]
[Authorize]
public sealed class AttendanceController(ISender sender) : ApiControllerBase(sender)
{
    [HttpPost("clock-in")]
    public async Task<ActionResult<ApiResponse<AttendanceDto>>> ClockIn(ClockInRequest request, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new ClockInCommand(request), cancellationToken));
}
