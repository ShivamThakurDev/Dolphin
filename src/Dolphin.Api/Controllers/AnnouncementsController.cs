using Asp.Versioning;
using Dolphin.Application.Common;
using Dolphin.Application.Hrms;
using Dolphin.Api.SignalR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Dolphin.Api.Controllers;

[ApiVersion(1)]
[Authorize]
public sealed class AnnouncementsController(ISender sender, IHubContext<NotificationHub> hubContext) : ApiControllerBase(sender)
{
    [HttpPost]
    [Authorize(Policy = "HrAdmin")]
    public async Task<ActionResult<ApiResponse<AnnouncementDto>>> Create(CreateAnnouncementRequest request, CancellationToken cancellationToken)
    {
        var result = await Sender.Send(new CreateAnnouncementCommand(request), cancellationToken);
        await hubContext.Clients.Group("tenant").SendAsync("announcement.created", result, cancellationToken);
        return OkResponse(result);
    }
}
