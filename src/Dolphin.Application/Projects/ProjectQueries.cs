using Dolphin.Application.Common;
using Dolphin.Domain.Enums;
using MediatR;

namespace Dolphin.Application.Projects;

public sealed record GetTasksPagedQuery(
    PagedRequest Page,
    Guid? AgencyId = null,
    Guid? AssignedEmployeeId = null,
    ProjectTaskStatus? Status = null
) : IRequest<PagedResult<TaskDto>>;

public sealed record GetAllTasksQuery(
    Guid? AgencyId = null,
    Guid? AssignedEmployeeId = null
) : IRequest<IReadOnlyList<TaskDto>>;

public sealed record GetTaskByIdQuery(Guid Id) : IRequest<TaskDto?>;

public sealed record GetTasksByEmployeeQuery(Guid EmployeeId) : IRequest<IReadOnlyList<TaskDto>>;

public sealed record GetAgenciesQuery(PagedRequest Page) : IRequest<PagedResult<AgencyDto>>;

public sealed record GetAllAgenciesQuery : IRequest<IReadOnlyList<AgencyDto>>;

public sealed record GetAgencyByIdQuery(Guid Id) : IRequest<AgencyDto?>;
