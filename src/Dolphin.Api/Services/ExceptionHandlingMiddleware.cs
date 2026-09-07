using Dolphin.Application.Common;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Api.Services;

public sealed class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(ApiResponse<ProblemDetails>.Fail(
                ex.Errors.Select(e => new ApiError("validation.error", e.ErrorMessage, e.PropertyName)),
                context.TraceIdentifier));
        }
        catch (UnauthorizedAccessException ex)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(ApiResponse<ProblemDetails>.Fail(
                [new ApiError("auth.unauthorized", ex.Message)], context.TraceIdentifier));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled API exception");
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(ApiResponse<ProblemDetails>.Fail(
                [new ApiError("server.error", "An unexpected error occurred.")], context.TraceIdentifier));
        }
    }
}
