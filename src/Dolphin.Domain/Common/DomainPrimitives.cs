namespace Dolphin.Domain.Common;

public abstract class BaseEntity
{
    public Guid Id { get; protected set; } = Guid.NewGuid();
}

public interface ISoftDelete
{
    bool IsDeleted { get; set; }
}

public interface IMustHaveTenant
{
    Guid TenantId { get; set; }
}

public abstract class BaseAuditableEntity : BaseEntity, ISoftDelete
{
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public string CreatedBy { get; set; } = "system";
    public DateTimeOffset? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
    public bool IsDeleted { get; set; }
}

public abstract class AuditableEntity : BaseAuditableEntity
{
}

public abstract class TenantEntity : AuditableEntity, IMustHaveTenant
{
    public Guid TenantId { get; set; }
}

public interface IDomainEvent
{
    DateTimeOffset OccurredAt { get; }
}

public interface IAggregateRoot;

