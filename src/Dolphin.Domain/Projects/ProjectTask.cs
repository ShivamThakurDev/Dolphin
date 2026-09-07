using Dolphin.Domain.Common;
using Dolphin.Domain.Enums;
using Dolphin.Domain.Hrms;

namespace Dolphin.Domain.Projects;

public sealed class ProjectTask : TenantEntity, IAggregateRoot
{
    private readonly List<ProjectTask> _subTasks = [];

    private ProjectTask() { }

    public ProjectTask(Guid tenantId, string title, string? description = null,
        ProjectTaskStatus status = ProjectTaskStatus.Todo, TaskPriority priority = TaskPriority.Medium,
        decimal progressPercentage = 0, int storyPoints = 0, DateTimeOffset? startDate = null,
        DateTimeOffset? dueDate = null, Guid? parentTaskId = null, Guid? assignedEmployeeId = null,
        Guid? agencyId = null)
    {
        TenantId = tenantId;
        Title = title;
        Description = description;
        Status = status;
        Priority = priority;
        ProgressPercentage = progressPercentage;
        StoryPoints = storyPoints;
        StartDate = startDate ?? DateTimeOffset.UtcNow;
        DueDate = dueDate;
        ParentTaskId = parentTaskId;
        AssignedEmployeeId = assignedEmployeeId;
        AgencyId = agencyId;
    }

    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ProjectTaskStatus Status { get; set; } = ProjectTaskStatus.Todo;
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    public decimal ProgressPercentage { get; set; }
    public int StoryPoints { get; set; }
    public DateTimeOffset StartDate { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? DueDate { get; set; }

    public Guid? ParentTaskId { get; set; }
    public ProjectTask? ParentTask { get; set; }
    public IReadOnlyCollection<ProjectTask> SubTasks => _subTasks;

    public Guid? AssignedEmployeeId { get; set; }
    public Employee? AssignedEmployee { get; set; }

    public Guid? AgencyId { get; set; }
    public Agency? Agency { get; set; }

    // Legacy/convenience property aliases
    public string Name
    {
        get => Title;
        set => Title = value;
    }

    public decimal Progress
    {
        get => ProgressPercentage;
        set => ProgressPercentage = value;
    }

    public int StoryPoint
    {
        get => StoryPoints;
        set => StoryPoints = value;
    }

    public DateTimeOffset? EndDate
    {
        get => DueDate;
        set => DueDate = value;
    }

    public Guid? ParentId
    {
        get => ParentTaskId;
        set => ParentTaskId = value;
    }
}
