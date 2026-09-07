using Dolphin.Domain.Common;

namespace Dolphin.Domain.Projects;

public sealed class Agency : TenantEntity, IAggregateRoot
{
    private readonly List<ProjectTask> _tasks = [];

    private Agency() { }

    public Agency(Guid tenantId, string name, string? description = null, string? email = null,
        string? phoneNumber = null, string? contactPerson = null, string? country = null, string? city = null)
    {
        TenantId = tenantId;
        Name = name;
        Description = description;
        Email = email?.Trim().ToLowerInvariant();
        PhoneNumber = phoneNumber;
        ContactPerson = contactPerson;
        Country = country;
        City = city;
    }

    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? ContactPerson { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public IReadOnlyCollection<ProjectTask> Tasks => _tasks;
}
