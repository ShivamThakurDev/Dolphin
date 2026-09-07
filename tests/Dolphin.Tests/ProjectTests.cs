using Dolphin.Application.Projects;
using Dolphin.Domain.Enums;
using Dolphin.Domain.Projects;
using FluentAssertions;
using FluentValidation.TestHelper;

namespace Dolphin.Tests;

public sealed class ProjectTests
{
    [Fact]
    public void ProjectTask_should_initialize_correctly_and_maintain_tenant_identity()
    {
        var tenantId = Guid.NewGuid();
        var employeeId = Guid.NewGuid();
        var agencyId = Guid.NewGuid();
        var now = DateTimeOffset.UtcNow;
        var due = now.AddDays(14);

        var task = new ProjectTask(
            tenantId,
            "Build Modular Monolith",
            "Consolidate domain and UI into clean architecture",
            ProjectTaskStatus.InProgress,
            TaskPriority.High,
            50m,
            8,
            now,
            due,
            null,
            employeeId,
            agencyId
        );

        task.TenantId.Should().Be(tenantId);
        task.Title.Should().Be("Build Modular Monolith");
        task.Name.Should().Be("Build Modular Monolith");
        task.Status.Should().Be(ProjectTaskStatus.InProgress);
        task.Priority.Should().Be(TaskPriority.High);
        task.ProgressPercentage.Should().Be(50m);
        task.Progress.Should().Be(50m);
        task.StoryPoints.Should().Be(8);
        task.StoryPoint.Should().Be(8);
        task.AssignedEmployeeId.Should().Be(employeeId);
        task.AgencyId.Should().Be(agencyId);
        task.IsDeleted.Should().BeFalse();
    }

    [Fact]
    public void ProjectTask_supports_hierarchical_subtasks()
    {
        var tenantId = Guid.NewGuid();
        var parentTask = new ProjectTask(tenantId, "Epic: Frontend Unification");
        var childTask = new ProjectTask(tenantId, "Subtask: Port Task Components", parentTaskId: parentTask.Id);

        childTask.ParentTaskId.Should().Be(parentTask.Id);
        childTask.ParentId.Should().Be(parentTask.Id);
    }

    [Fact]
    public void Agency_should_initialize_correctly_and_track_details()
    {
        var tenantId = Guid.NewGuid();
        var agency = new Agency(
            tenantId,
            "Apex Agency",
            "Creative and Technical Partner",
            "info@apex.local",
            "+1-800-555-0100",
            "Jane Doe",
            "Canada",
            "Toronto"
        );

        agency.TenantId.Should().Be(tenantId);
        agency.Name.Should().Be("Apex Agency");
        agency.Email.Should().Be("info@apex.local");
        agency.ContactPerson.Should().Be("Jane Doe");
        agency.Country.Should().Be("Canada");
        agency.City.Should().Be("Toronto");
        agency.IsDeleted.Should().BeFalse();
    }

    [Fact]
    public void CreateTaskValidator_should_validate_required_and_boundary_rules()
    {
        var validator = new CreateTaskValidator();

        // Empty title
        var invalidTitle = new CreateTaskCommand(new CreateTaskRequest("", "Description"));
        var resultTitle = validator.TestValidate(invalidTitle);
        resultTitle.ShouldHaveValidationErrorFor(x => x.Request.EffectiveTitle);

        // Negative story points
        var invalidStory = new CreateTaskCommand(new CreateTaskRequest("Valid Title", "Desc", StoryPoints: -5));
        var resultStory = validator.TestValidate(invalidStory);
        resultStory.ShouldHaveValidationErrorFor(x => x.Request.EffectiveStoryPoints);

        // Progress > 100%
        var invalidProgress = new CreateTaskCommand(new CreateTaskRequest("Valid Title", "Desc", ProgressPercentage: 120));
        var resultProgress = validator.TestValidate(invalidProgress);
        resultProgress.ShouldHaveValidationErrorFor(x => x.Request.EffectiveProgress);

        // Due date before start date
        var now = DateTimeOffset.UtcNow;
        var invalidDates = new CreateTaskCommand(new CreateTaskRequest("Valid Title", "Desc", StartDate: now, DueDate: now.AddDays(-1)));
        var resultDates = validator.TestValidate(invalidDates);
        resultDates.ShouldHaveValidationErrorFor(x => x.Request);

        // Valid command
        var valid = new CreateTaskCommand(new CreateTaskRequest(
            "Clean Architecture Integration",
            "All fields valid",
            ProjectTaskStatus.Todo,
            TaskPriority.Medium,
            25m,
            5,
            now,
            now.AddDays(7)
        ));
        var validResult = validator.TestValidate(valid);
        validResult.ShouldNotHaveAnyValidationErrors();
    }
}
