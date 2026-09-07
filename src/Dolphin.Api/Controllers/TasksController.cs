using Asp.Versioning;
using Dolphin.Api.SignalR;
using Dolphin.Application.Common;
using Dolphin.Application.Projects;
using Dolphin.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Dolphin.Api.Controllers;

[ApiVersion(1)]
[Authorize]
public sealed class TasksController(ISender sender, IHubContext<NotificationHub> hubContext) : ApiControllerBase(sender)
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<PagedResult<TaskDto>>>> List(
        [FromQuery] PagedRequest page,
        [FromQuery] Guid? agencyId,
        [FromQuery] Guid? assignedEmployeeId,
        [FromQuery] ProjectTaskStatus? status,
        CancellationToken cancellationToken)
    {
        var result = await Sender.Send(new GetTasksPagedQuery(page, agencyId, assignedEmployeeId, status), cancellationToken);
        return OkResponse(result);
    }

    [HttpGet("all")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<TaskDto>>>> GetAll(
        [FromQuery] Guid? agencyId,
        [FromQuery] Guid? assignedEmployeeId,
        CancellationToken cancellationToken)
    {
        var result = await Sender.Send(new GetAllTasksQuery(agencyId, assignedEmployeeId), cancellationToken);
        return OkResponse(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<TaskDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var result = await Sender.Send(new GetTaskByIdQuery(id), cancellationToken);
        if (result is null)
            return NotFound(ApiResponse<TaskDto>.Fail([new ApiError("NotFound", $"Task with ID '{id}' was not found.")]));
        return OkResponse(result);
    }

    [HttpGet("by-employee/{employeeId:guid}")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<TaskDto>>>> GetByEmployee(Guid employeeId, CancellationToken cancellationToken)
    {
        var result = await Sender.Send(new GetTasksByEmployeeQuery(employeeId), cancellationToken);
        return OkResponse(result);
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<TaskDto>>> Create([FromBody] CreateTaskRequest request, CancellationToken cancellationToken)
    {
        var result = await Sender.Send(new CreateTaskCommand(request), cancellationToken);
        await hubContext.Clients.Group("tenant").SendAsync("TaskCreated", result, cancellationToken);
        if (result.AssignedEmployeeId.HasValue)
        {
            await hubContext.Clients.Group("tenant").SendAsync("TaskAssigned", result, cancellationToken);
        }
        return OkResponse(result);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<TaskDto>>> Update(Guid id, [FromBody] UpdateTaskRequest request, CancellationToken cancellationToken)
    {
        var result = await Sender.Send(new UpdateTaskCommand(id, request), cancellationToken);
        await hubContext.Clients.Group("tenant").SendAsync("TaskUpdated", result, cancellationToken);
        return OkResponse(result);
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<ActionResult<ApiResponse<TaskDto>>> UpdateStatus(Guid id, [FromBody] UpdateTaskStatusRequest request, CancellationToken cancellationToken)
    {
        var result = await Sender.Send(new UpdateTaskStatusCommand(id, request.Status), cancellationToken);
        await hubContext.Clients.Group("tenant").SendAsync("TaskStatusChanged", result, cancellationToken);
        return OkResponse(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var result = await Sender.Send(new DeleteTaskCommand(id), cancellationToken);
        await hubContext.Clients.Group("tenant").SendAsync("TaskDeleted", id, cancellationToken);
        return OkResponse(result);
    }

    // Legacy Dolphin-1 compatibility routes
    [AllowAnonymous]
    [HttpGet("/Task/GetAll")]
    public async Task<ActionResult<IEnumerable<TaskDto>>> LegacyGetAll(CancellationToken cancellationToken)
    {
        var result = await Sender.Send(new GetAllTasksQuery(), cancellationToken);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpGet("/Task/GetById/{id}")]
    public async Task<ActionResult<TaskDto>> LegacyGetById(string id, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(id, out var guid)) return BadRequest("Invalid GUID format.");
        var result = await Sender.Send(new GetTaskByIdQuery(guid), cancellationToken);
        return result != null ? Ok(result) : NotFound();
    }

    [AllowAnonymous]
    [HttpPost("/Task/Add")]
    public async Task<IActionResult> LegacyAdd([FromBody] CreateTaskRequest request, CancellationToken cancellationToken)
    {
        var result = await Sender.Send(new CreateTaskCommand(request), cancellationToken);
        await hubContext.Clients.Group("tenant").SendAsync("TaskCreated", result, cancellationToken);
        return Created($"/Task/GetById/{result.Id}", result);
    }

    [AllowAnonymous]
    [HttpPut("/Task/Edit/{id}")]
    public async Task<IActionResult> LegacyEdit(string id, [FromBody] UpdateTaskRequest request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(id, out var guid)) return BadRequest("Invalid GUID format.");
        var result = await Sender.Send(new UpdateTaskCommand(guid, request), cancellationToken);
        await hubContext.Clients.Group("tenant").SendAsync("TaskUpdated", result, cancellationToken);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpDelete("/Task/Delete/{id}")]
    public async Task<IActionResult> LegacyDelete(string id, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(id, out var guid)) return BadRequest("Invalid GUID format.");
        await Sender.Send(new DeleteTaskCommand(guid), cancellationToken);
        await hubContext.Clients.Group("tenant").SendAsync("TaskDeleted", guid, cancellationToken);
        return Ok();
    }
}
