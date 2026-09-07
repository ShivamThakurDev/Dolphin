using Dolphin.Application.Common;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Api.Controllers;

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
public abstract class ApiControllerBase(ISender sender) : ControllerBase
{
    protected ISender Sender { get; } = sender;
    protected ActionResult<ApiResponse<T>> OkResponse<T>(T data) => Ok(ApiResponse<T>.Ok(data, HttpContext.TraceIdentifier));
}
