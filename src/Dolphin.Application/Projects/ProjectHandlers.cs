using Dolphin.Application.Common;
using Dolphin.Domain.Hrms;
using Dolphin.Domain.Projects;
using MediatR;

namespace Dolphin.Application.Projects;

public sealed class ProjectHandlers(
    IRepository<ProjectTask> tasks,
    IRepository<Agency> agencies,
    IRepository<Employee> employees,
    ITenantContext tenantContext,
    IApplicationDbContext dbContext
) :
    IRequestHandler<CreateTaskCommand, TaskDto>,
    IRequestHandler<UpdateTaskCommand, TaskDto>,
    IRequestHandler<UpdateTaskStatusCommand, TaskDto>,
    IRequestHandler<DeleteTaskCommand, bool>,
    IRequestHandler<CreateAgencyCommand, AgencyDto>,
    IRequestHandler<UpdateAgencyCommand, AgencyDto>,
    IRequestHandler<DeleteAgencyCommand, bool>,
    IRequestHandler<GetTasksPagedQuery, PagedResult<TaskDto>>,
    IRequestHandler<GetAllTasksQuery, IReadOnlyList<TaskDto>>,
    IRequestHandler<GetTaskByIdQuery, TaskDto?>,
    IRequestHandler<GetTasksByEmployeeQuery, IReadOnlyList<TaskDto>>,
    IRequestHandler<GetAgenciesQuery, PagedResult<AgencyDto>>,
    IRequestHandler<GetAllAgenciesQuery, IReadOnlyList<AgencyDto>>,
    IRequestHandler<GetAgencyByIdQuery, AgencyDto?>
{
    public async Task<TaskDto> Handle(CreateTaskCommand command, CancellationToken cancellationToken)
    {
        var r = command.Request;
        var task = new ProjectTask(
            tenantContext.TenantId,
            r.EffectiveTitle,
            r.Description,
            r.Status,
            r.Priority,
            r.EffectiveProgress,
            r.EffectiveStoryPoints,
            r.StartDate ?? DateTimeOffset.UtcNow,
            r.EffectiveDueDate,
            r.EffectiveParentTaskId,
            r.AssignedEmployeeId,
            r.AgencyId
        );

        await tasks.AddAsync(task, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        string? employeeName = null;
        if (task.AssignedEmployeeId.HasValue)
        {
            var emp = await employees.GetByIdAsync(task.AssignedEmployeeId.Value, cancellationToken);
            employeeName = emp?.FullName;
        }

        string? agencyName = null;
        if (task.AgencyId.HasValue)
        {
            var ag = await agencies.GetByIdAsync(task.AgencyId.Value, cancellationToken);
            agencyName = ag?.Name;
        }

        return MapTaskToDto(task, employeeName, agencyName);
    }

    public async Task<TaskDto> Handle(UpdateTaskCommand command, CancellationToken cancellationToken)
    {
        var task = await tasks.GetByIdAsync(command.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"Task with ID '{command.Id}' not found.");

        var r = command.Request;
        task.Title = r.EffectiveTitle;
        task.Description = r.Description;
        task.Status = r.Status;
        task.Priority = r.Priority;
        task.ProgressPercentage = r.EffectiveProgress;
        task.StoryPoints = r.EffectiveStoryPoints;
        if (r.StartDate.HasValue) task.StartDate = r.StartDate.Value;
        task.DueDate = r.EffectiveDueDate;
        task.ParentTaskId = r.EffectiveParentTaskId;
        task.AssignedEmployeeId = r.AssignedEmployeeId;
        task.AgencyId = r.AgencyId;

        tasks.Update(task);
        await dbContext.SaveChangesAsync(cancellationToken);

        string? employeeName = null;
        if (task.AssignedEmployeeId.HasValue)
        {
            var emp = await employees.GetByIdAsync(task.AssignedEmployeeId.Value, cancellationToken);
            employeeName = emp?.FullName;
        }

        string? agencyName = null;
        if (task.AgencyId.HasValue)
        {
            var ag = await agencies.GetByIdAsync(task.AgencyId.Value, cancellationToken);
            agencyName = ag?.Name;
        }

        return MapTaskToDto(task, employeeName, agencyName);
    }

    public async Task<TaskDto> Handle(UpdateTaskStatusCommand command, CancellationToken cancellationToken)
    {
        var task = await tasks.GetByIdAsync(command.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"Task with ID '{command.Id}' not found.");

        task.Status = command.Status;
        if (command.Status == Domain.Enums.ProjectTaskStatus.Done)
        {
            task.ProgressPercentage = 100;
        }

        tasks.Update(task);
        await dbContext.SaveChangesAsync(cancellationToken);

        string? employeeName = null;
        if (task.AssignedEmployeeId.HasValue)
        {
            var emp = await employees.GetByIdAsync(task.AssignedEmployeeId.Value, cancellationToken);
            employeeName = emp?.FullName;
        }

        string? agencyName = null;
        if (task.AgencyId.HasValue)
        {
            var ag = await agencies.GetByIdAsync(task.AgencyId.Value, cancellationToken);
            agencyName = ag?.Name;
        }

        return MapTaskToDto(task, employeeName, agencyName);
    }

    public async Task<bool> Handle(DeleteTaskCommand command, CancellationToken cancellationToken)
    {
        var task = await tasks.GetByIdAsync(command.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"Task with ID '{command.Id}' not found.");

        task.IsDeleted = true;
        tasks.Update(task);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<AgencyDto> Handle(CreateAgencyCommand command, CancellationToken cancellationToken)
    {
        var r = command.Request;
        var agency = new Agency(
            tenantContext.TenantId,
            r.Name,
            r.Description,
            r.Email,
            r.PhoneNumber,
            r.ContactPerson,
            r.Country,
            r.City
        );

        await agencies.AddAsync(agency, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new AgencyDto(
            agency.Id,
            agency.Name,
            agency.Description,
            agency.PhoneNumber,
            agency.Email,
            agency.ContactPerson,
            agency.Country,
            agency.City,
            0
        );
    }

    public async Task<AgencyDto> Handle(UpdateAgencyCommand command, CancellationToken cancellationToken)
    {
        var agency = await agencies.GetByIdAsync(command.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"Agency with ID '{command.Id}' not found.");

        var r = command.Request;
        agency.Name = r.Name;
        agency.Description = r.Description;
        agency.PhoneNumber = r.PhoneNumber;
        agency.Email = r.Email?.Trim().ToLowerInvariant();
        agency.ContactPerson = r.ContactPerson;
        agency.Country = r.Country;
        agency.City = r.City;

        agencies.Update(agency);
        await dbContext.SaveChangesAsync(cancellationToken);

        var taskCount = dbContext.Query<ProjectTask>().Count(t => t.AgencyId == agency.Id);
        return new AgencyDto(
            agency.Id,
            agency.Name,
            agency.Description,
            agency.PhoneNumber,
            agency.Email,
            agency.ContactPerson,
            agency.Country,
            agency.City,
            taskCount
        );
    }

    public async Task<bool> Handle(DeleteAgencyCommand command, CancellationToken cancellationToken)
    {
        var agency = await agencies.GetByIdAsync(command.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"Agency with ID '{command.Id}' not found.");

        agency.IsDeleted = true;
        agencies.Update(agency);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<PagedResult<TaskDto>> Handle(GetTasksPagedQuery request, CancellationToken cancellationToken)
    {
        var page = request.Page.PageNumber < 1 ? 1 : request.Page.PageNumber;
        var size = request.Page.PageSize is < 1 or > 100 ? 20 : request.Page.PageSize;

        var query = dbContext.Query<ProjectTask>();

        if (request.AgencyId.HasValue)
            query = query.Where(t => t.AgencyId == request.AgencyId.Value);

        if (request.AssignedEmployeeId.HasValue)
            query = query.Where(t => t.AssignedEmployeeId == request.AssignedEmployeeId.Value);

        if (request.Status.HasValue)
            query = query.Where(t => t.Status == request.Status.Value);

        query = query.OrderByDescending(t => t.CreatedAt);

        var total = query.Count();
        var rawTasks = query.Skip((page - 1) * size).Take(size).ToList();

        var employeeIds = rawTasks.Where(t => t.AssignedEmployeeId.HasValue).Select(t => t.AssignedEmployeeId!.Value).Distinct().ToList();
        var agencyIds = rawTasks.Where(t => t.AgencyId.HasValue).Select(t => t.AgencyId!.Value).Distinct().ToList();

        var employeeMap = dbContext.Query<Employee>().Where(e => employeeIds.Contains(e.Id))
            .ToDictionary(e => e.Id, e => e.FullName);
        var agencyMap = dbContext.Query<Agency>().Where(a => agencyIds.Contains(a.Id))
            .ToDictionary(a => a.Id, a => a.Name);

        var items = rawTasks.Select(t => MapTaskToDto(
            t,
            t.AssignedEmployeeId.HasValue && employeeMap.TryGetValue(t.AssignedEmployeeId.Value, out var empName) ? empName : null,
            t.AgencyId.HasValue && agencyMap.TryGetValue(t.AgencyId.Value, out var agName) ? agName : null
        )).ToList();

        return await Task.FromResult(new PagedResult<TaskDto>(items, page, size, total));
    }

    public async Task<IReadOnlyList<TaskDto>> Handle(GetAllTasksQuery request, CancellationToken cancellationToken)
    {
        var query = dbContext.Query<ProjectTask>();

        if (request.AgencyId.HasValue)
            query = query.Where(t => t.AgencyId == request.AgencyId.Value);

        if (request.AssignedEmployeeId.HasValue)
            query = query.Where(t => t.AssignedEmployeeId == request.AssignedEmployeeId.Value);

        query = query.OrderByDescending(t => t.CreatedAt);

        var rawTasks = query.ToList();
        var employeeIds = rawTasks.Where(t => t.AssignedEmployeeId.HasValue).Select(t => t.AssignedEmployeeId!.Value).Distinct().ToList();
        var agencyIds = rawTasks.Where(t => t.AgencyId.HasValue).Select(t => t.AgencyId!.Value).Distinct().ToList();

        var employeeMap = dbContext.Query<Employee>().Where(e => employeeIds.Contains(e.Id))
            .ToDictionary(e => e.Id, e => e.FullName);
        var agencyMap = dbContext.Query<Agency>().Where(a => agencyIds.Contains(a.Id))
            .ToDictionary(a => a.Id, a => a.Name);

        var items = rawTasks.Select(t => MapTaskToDto(
            t,
            t.AssignedEmployeeId.HasValue && employeeMap.TryGetValue(t.AssignedEmployeeId.Value, out var empName) ? empName : null,
            t.AgencyId.HasValue && agencyMap.TryGetValue(t.AgencyId.Value, out var agName) ? agName : null
        )).ToList();

        return await Task.FromResult(items);
    }

    public async Task<TaskDto?> Handle(GetTaskByIdQuery request, CancellationToken cancellationToken)
    {
        var task = await tasks.GetByIdAsync(request.Id, cancellationToken);
        if (task is null) return null;

        string? employeeName = null;
        if (task.AssignedEmployeeId.HasValue)
        {
            var emp = await employees.GetByIdAsync(task.AssignedEmployeeId.Value, cancellationToken);
            employeeName = emp?.FullName;
        }

        string? agencyName = null;
        if (task.AgencyId.HasValue)
        {
            var ag = await agencies.GetByIdAsync(task.AgencyId.Value, cancellationToken);
            agencyName = ag?.Name;
        }

        return MapTaskToDto(task, employeeName, agencyName);
    }

    public async Task<IReadOnlyList<TaskDto>> Handle(GetTasksByEmployeeQuery request, CancellationToken cancellationToken)
    {
        var rawTasks = dbContext.Query<ProjectTask>()
            .Where(t => t.AssignedEmployeeId == request.EmployeeId)
            .OrderByDescending(t => t.CreatedAt)
            .ToList();

        var agencyIds = rawTasks.Where(t => t.AgencyId.HasValue).Select(t => t.AgencyId!.Value).Distinct().ToList();
        var agencyMap = dbContext.Query<Agency>().Where(a => agencyIds.Contains(a.Id))
            .ToDictionary(a => a.Id, a => a.Name);

        var emp = await employees.GetByIdAsync(request.EmployeeId, cancellationToken);
        var empName = emp?.FullName;

        var items = rawTasks.Select(t => MapTaskToDto(
            t,
            empName,
            t.AgencyId.HasValue && agencyMap.TryGetValue(t.AgencyId.Value, out var agName) ? agName : null
        )).ToList();

        return await Task.FromResult(items);
    }

    public async Task<PagedResult<AgencyDto>> Handle(GetAgenciesQuery request, CancellationToken cancellationToken)
    {
        var page = request.Page.PageNumber < 1 ? 1 : request.Page.PageNumber;
        var size = request.Page.PageSize is < 1 or > 100 ? 20 : request.Page.PageSize;

        var query = dbContext.Query<Agency>().OrderBy(a => a.Name);
        var total = query.Count();
        var rawAgencies = query.Skip((page - 1) * size).Take(size).ToList();

        var agencyIds = rawAgencies.Select(a => a.Id).ToList();
        var taskCounts = dbContext.Query<ProjectTask>()
            .Where(t => t.AgencyId.HasValue && agencyIds.Contains(t.AgencyId.Value))
            .GroupBy(t => t.AgencyId!.Value)
            .ToDictionary(g => g.Key, g => g.Count());

        var items = rawAgencies.Select(a => new AgencyDto(
            a.Id,
            a.Name,
            a.Description,
            a.PhoneNumber,
            a.Email,
            a.ContactPerson,
            a.Country,
            a.City,
            taskCounts.TryGetValue(a.Id, out var c) ? c : 0
        )).ToList();

        return await Task.FromResult(new PagedResult<AgencyDto>(items, page, size, total));
    }

    public async Task<IReadOnlyList<AgencyDto>> Handle(GetAllAgenciesQuery request, CancellationToken cancellationToken)
    {
        var rawAgencies = dbContext.Query<Agency>().OrderBy(a => a.Name).ToList();
        var agencyIds = rawAgencies.Select(a => a.Id).ToList();
        var taskCounts = dbContext.Query<ProjectTask>()
            .Where(t => t.AgencyId.HasValue && agencyIds.Contains(t.AgencyId.Value))
            .GroupBy(t => t.AgencyId!.Value)
            .ToDictionary(g => g.Key, g => g.Count());

        var items = rawAgencies.Select(a => new AgencyDto(
            a.Id,
            a.Name,
            a.Description,
            a.PhoneNumber,
            a.Email,
            a.ContactPerson,
            a.Country,
            a.City,
            taskCounts.TryGetValue(a.Id, out var c) ? c : 0
        )).ToList();

        return await Task.FromResult(items);
    }

    public async Task<AgencyDto?> Handle(GetAgencyByIdQuery request, CancellationToken cancellationToken)
    {
        var agency = await agencies.GetByIdAsync(request.Id, cancellationToken);
        if (agency is null) return null;

        var taskCount = dbContext.Query<ProjectTask>().Count(t => t.AgencyId == agency.Id);
        return new AgencyDto(
            agency.Id,
            agency.Name,
            agency.Description,
            agency.PhoneNumber,
            agency.Email,
            agency.ContactPerson,
            agency.Country,
            agency.City,
            taskCount
        );
    }

    private static TaskDto MapTaskToDto(ProjectTask task, string? employeeName, string? agencyName) =>
        new(
            task.Id,
            task.Title,
            task.Description,
            task.Status,
            task.Priority,
            task.ProgressPercentage,
            task.StoryPoints,
            task.StartDate,
            task.DueDate,
            task.ParentTaskId,
            task.AssignedEmployeeId,
            employeeName,
            task.AgencyId,
            agencyName
        );
}
