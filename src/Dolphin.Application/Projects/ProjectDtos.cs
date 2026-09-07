using Dolphin.Application.Common;
using Dolphin.Domain.Enums;

namespace Dolphin.Application.Projects;

public sealed record TaskDto(
    Guid Id,
    string Title,
    string? Description,
    ProjectTaskStatus Status,
    TaskPriority Priority,
    decimal ProgressPercentage,
    int StoryPoints,
    DateTimeOffset StartDate,
    DateTimeOffset? DueDate,
    Guid? ParentTaskId,
    Guid? AssignedEmployeeId,
    string? AssignedEmployeeName,
    Guid? AgencyId,
    string? AgencyName,
    bool IsAssigneeOnLeave = false,
    DateOnly? LeaveReturnDate = null
)
{
    // Backwards-compatible aliases for legacy frontend
    public string Name => Title;
    public decimal Progress => ProgressPercentage;
    public int StoryPoint => StoryPoints;
    public DateTimeOffset? EndDate => DueDate;
    public Guid? ParentId => ParentTaskId;
    public bool HasConflict => IsAssigneeOnLeave;
}

public sealed record CreateTaskRequest(
    string? Title,
    string? Description,
    ProjectTaskStatus Status = ProjectTaskStatus.Todo,
    TaskPriority Priority = TaskPriority.Medium,
    decimal ProgressPercentage = 0,
    int StoryPoints = 0,
    DateTimeOffset? StartDate = null,
    DateTimeOffset? DueDate = null,
    Guid? ParentTaskId = null,
    Guid? AssignedEmployeeId = null,
    Guid? AgencyId = null,
    string? Name = null,
    decimal? Progress = null,
    int? StoryPoint = null,
    DateTimeOffset? EndDate = null,
    Guid? ParentId = null
)
{
    public string EffectiveTitle => !string.IsNullOrWhiteSpace(Title) ? Title : (Name ?? string.Empty);
    public decimal EffectiveProgress => ProgressPercentage != 0 ? ProgressPercentage : (Progress ?? 0);
    public int EffectiveStoryPoints => StoryPoints != 0 ? StoryPoints : (StoryPoint ?? 0);
    public DateTimeOffset? EffectiveDueDate => DueDate ?? EndDate;
    public Guid? EffectiveParentTaskId => ParentTaskId ?? ParentId;
}

public sealed record UpdateTaskRequest(
    string? Title,
    string? Description,
    ProjectTaskStatus Status,
    TaskPriority Priority,
    decimal ProgressPercentage,
    int StoryPoints,
    DateTimeOffset? StartDate,
    DateTimeOffset? DueDate,
    Guid? ParentTaskId,
    Guid? AssignedEmployeeId,
    Guid? AgencyId,
    string? Name = null,
    decimal? Progress = null,
    int? StoryPoint = null,
    DateTimeOffset? EndDate = null,
    Guid? ParentId = null
)
{
    public string EffectiveTitle => !string.IsNullOrWhiteSpace(Title) ? Title : (Name ?? string.Empty);
    public decimal EffectiveProgress => ProgressPercentage != 0 ? ProgressPercentage : (Progress ?? 0);
    public int EffectiveStoryPoints => StoryPoints != 0 ? StoryPoints : (StoryPoint ?? 0);
    public DateTimeOffset? EffectiveDueDate => DueDate ?? EndDate;
    public Guid? EffectiveParentTaskId => ParentTaskId ?? ParentId;
}

public sealed record UpdateTaskStatusRequest(ProjectTaskStatus Status);

public sealed record AgencyDto(
    Guid Id,
    string Name,
    string? Description,
    string? PhoneNumber,
    string? Email,
    string? ContactPerson,
    string? Country,
    string? City,
    int TaskCount
);

public sealed record CreateAgencyRequest(
    string Name,
    string? Description,
    string? PhoneNumber,
    string? Email,
    string? ContactPerson,
    string? Country,
    string? City
);

public sealed record UpdateAgencyRequest(
    string Name,
    string? Description,
    string? PhoneNumber,
    string? Email,
    string? ContactPerson,
    string? Country,
    string? City
);
