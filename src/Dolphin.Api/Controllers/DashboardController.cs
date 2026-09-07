using Asp.Versioning;
using Dolphin.Application.Common;
using Dolphin.Application.Hrms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Api.Controllers;

[ApiVersion(1)]
[Authorize]
public sealed class DashboardController(ISender sender) : ApiControllerBase(sender)
{
    [HttpGet("summary")]
    public async Task<ActionResult<ApiResponse<DashboardSummaryDto>>> Summary(CancellationToken cancellationToken) =>
        OkResponse(await Sender.Send(new GetDashboardSummaryQuery(), cancellationToken));
}
