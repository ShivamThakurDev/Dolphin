using Dolphin.Domain.Enums;
using MediatR;

namespace Dolphin.Application.Projects;

public sealed record CreateTaskCommand(CreateTaskRequest Request) : IRequest<TaskDto>;
public sealed record UpdateTaskCommand(Guid Id, UpdateTaskRequest Request) : IRequest<TaskDto>;
public sealed record UpdateTaskStatusCommand(Guid Id, ProjectTaskStatus Status) : IRequest<TaskDto>;
public sealed record DeleteTaskCommand(Guid Id) : IRequest<bool>;

public sealed record CreateAgencyCommand(CreateAgencyRequest Request) : IRequest<AgencyDto>;
public sealed record UpdateAgencyCommand(Guid Id, UpdateAgencyRequest Request) : IRequest<AgencyDto>;
public sealed record DeleteAgencyCommand(Guid Id) : IRequest<bool>;
