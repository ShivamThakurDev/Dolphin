using FluentValidation;

namespace Dolphin.Application.Projects;

public sealed class CreateTaskValidator : AbstractValidator<CreateTaskCommand>
{
    public CreateTaskValidator()
    {
        RuleFor(x => x.Request.EffectiveTitle)
            .NotEmpty().WithMessage("Task title is required.")
            .MaximumLength(200).WithMessage("Task title cannot exceed 200 characters.");

        RuleFor(x => x.Request.EffectiveStoryPoints)
            .GreaterThanOrEqualTo(0).WithMessage("Story points must be greater than or equal to 0.");

        RuleFor(x => x.Request.EffectiveProgress)
            .InclusiveBetween(0, 100).WithMessage("Progress must be between 0% and 100%.");

        RuleFor(x => x.Request)
            .Must(r => !r.EffectiveDueDate.HasValue || !r.StartDate.HasValue || r.EffectiveDueDate.Value >= r.StartDate.Value)
            .WithMessage("Due date must be on or after start date.");
    }
}

public sealed class UpdateTaskValidator : AbstractValidator<UpdateTaskCommand>
{
    public UpdateTaskValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage("Task ID is required.");

        RuleFor(x => x.Request.EffectiveTitle)
            .NotEmpty().WithMessage("Task title is required.")
            .MaximumLength(200).WithMessage("Task title cannot exceed 200 characters.");

        RuleFor(x => x.Request.EffectiveStoryPoints)
            .GreaterThanOrEqualTo(0).WithMessage("Story points must be greater than or equal to 0.");

        RuleFor(x => x.Request.EffectiveProgress)
            .InclusiveBetween(0, 100).WithMessage("Progress must be between 0% and 100%.");

        RuleFor(x => x.Request)
            .Must(r => !r.EffectiveDueDate.HasValue || !r.StartDate.HasValue || r.EffectiveDueDate.Value >= r.StartDate.Value)
            .WithMessage("Due date must be on or after start date.");
    }
}

public sealed class CreateAgencyValidator : AbstractValidator<CreateAgencyCommand>
{
    public CreateAgencyValidator()
    {
        RuleFor(x => x.Request.Name)
            .NotEmpty().WithMessage("Agency name is required.")
            .MaximumLength(200).WithMessage("Agency name cannot exceed 200 characters.");

        RuleFor(x => x.Request.Email)
            .EmailAddress().When(x => !string.IsNullOrWhiteSpace(x.Request.Email))
            .WithMessage("A valid email address is required.");
    }
}

public sealed class UpdateAgencyValidator : AbstractValidator<UpdateAgencyCommand>
{
    public UpdateAgencyValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage("Agency ID is required.");

        RuleFor(x => x.Request.Name)
            .NotEmpty().WithMessage("Agency name is required.")
            .MaximumLength(200).WithMessage("Agency name cannot exceed 200 characters.");

        RuleFor(x => x.Request.Email)
            .EmailAddress().When(x => !string.IsNullOrWhiteSpace(x.Request.Email))
            .WithMessage("A valid email address is required.");
    }
}
