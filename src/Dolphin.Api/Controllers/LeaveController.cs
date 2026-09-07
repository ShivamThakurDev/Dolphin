using Asp.Versioning;
using Dolphin.Application.Common;
using Dolphin.Application.Hrms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Api.Controllers;

[ApiVersion(1)]
[Authorize]
public sealed class LeaveController(ISender sender) : ApiControllerBase(sender)
{
    [HttpPost("requests")]
    public async Task<ActionResult<ApiResponse<LeaveRequestDto>>> Create(CreateLeaveRequest request, CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new CreateLeaveCommand(request), cancellationToken));
}
