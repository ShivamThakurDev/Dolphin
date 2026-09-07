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
    protected ActionResult<ApiResponse<T>> NotFoundResponse<T>(string message) => NotFound(ApiResponse<T>.Fail([new ApiError("not_found", message)], HttpContext.TraceIdentifier));
}
