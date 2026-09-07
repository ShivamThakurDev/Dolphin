using Dolphin.Domain.Common;
using Dolphin.Domain.Enums;

namespace Dolphin.Domain.Hrms;

public sealed class Department : TenantEntity
{
    private Department() { }
    public Department(Guid tenantId, string name, string code) { TenantId = tenantId; Name = name; Code = code; }
    public string Name { get; private set; } = string.Empty;
    public string Code { get; private set; } = string.Empty;
}

public sealed class Designation : TenantEntity
{
    private Designation() { }
    public Designation(Guid tenantId, string title) { TenantId = tenantId; Title = title; }
    public string Title { get; private set; } = string.Empty;
}

public sealed class WorkLocation : TenantEntity
{
    private WorkLocation() { }
    public WorkLocation(Guid tenantId, string name, string city, string country)
    {
        TenantId = tenantId; Name = name; City = city; Country = country;
    }
    public string Name { get; private set; } = string.Empty;
    public string City { get; private set; } = string.Empty;
    public string Country { get; private set; } = string.Empty;
}

public sealed class Employee : TenantEntity, IAggregateRoot
{
    private readonly List<EmployeeDocument> _documents = [];
    private readonly List<AssetAssignment> _assetAssignments = [];

    private Employee() { }

    public Employee(Guid tenantId, string employeeCode, string firstName, string lastName, string email)
    {
        TenantId = tenantId;
        EmployeeCode = employeeCode;
        FirstName = firstName;
        LastName = lastName;
        WorkEmail = email.Trim().ToLowerInvariant();
    }

    public string EmployeeCode { get; private set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}".Trim();
    public string WorkEmail { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public DateOnly JoiningDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public EmploymentStatus Status { get; set; } = EmploymentStatus.Active;
    public Guid? DepartmentId { get; set; }
    public Guid? DesignationId { get; set; }
    public Guid? WorkLocationId { get; set; }
    public Guid? ReportingManagerId { get; set; }
    public IReadOnlyCollection<EmployeeDocument> Documents => _documents;
    public IReadOnlyCollection<AssetAssignment> AssetAssignments => _assetAssignments;
}

public sealed class AttendanceEntry : TenantEntity
{
    private AttendanceEntry() { }
    public AttendanceEntry(Guid tenantId, Guid employeeId, DateOnly workDate, DateTimeOffset clockIn)
    {
        TenantId = tenantId; EmployeeId = employeeId; WorkDate = workDate; ClockIn = clockIn;
    }
    public Guid EmployeeId { get; private set; }
    public DateOnly WorkDate { get; private set; }
    public DateTimeOffset ClockIn { get; private set; }
    public DateTimeOffset? ClockOut { get; set; }
    public AttendanceStatus Status { get; set; } = AttendanceStatus.Present;
    public string? Source { get; set; } = "web";
}

public sealed class LeavePolicy : TenantEntity
{
    private LeavePolicy() { }
    public LeavePolicy(Guid tenantId, string name, decimal annualAllowance)
    {
        TenantId = tenantId; Name = name; AnnualAllowance = annualAllowance;
    }
    public string Name { get; private set; } = string.Empty;
    public decimal AnnualAllowance { get; private set; }
    public bool RequiresApproval { get; set; } = true;
}

public sealed class LeaveRequest : TenantEntity
{
    private LeaveRequest() { }
    public LeaveRequest(Guid tenantId, Guid employeeId, Guid leavePolicyId, DateOnly from, DateOnly to, string reason)
    {
        TenantId = tenantId; EmployeeId = employeeId; LeavePolicyId = leavePolicyId; From = from; To = to; Reason = reason;
    }
    public Guid EmployeeId { get; private set; }
    public Guid LeavePolicyId { get; private set; }
    public DateOnly From { get; private set; }
    public DateOnly To { get; private set; }
    public string Reason { get; private set; } = string.Empty;
    public LeaveRequestStatus Status { get; set; } = LeaveRequestStatus.Pending;
    public Guid? ApproverEmployeeId { get; set; }
}

public sealed class EmployeeDocument : TenantEntity
{
    private EmployeeDocument() { }
    public EmployeeDocument(Guid tenantId, Guid employeeId, string folder, string fileName, string storageKey)
    {
        TenantId = tenantId; EmployeeId = employeeId; Folder = folder; FileName = fileName; StorageKey = storageKey;
    }
    public Guid EmployeeId { get; private set; }
    public string Folder { get; private set; } = string.Empty;
    public string FileName { get; private set; } = string.Empty;
    public string StorageKey { get; private set; } = string.Empty;
    public DocumentStatus Status { get; set; }
}

public sealed class Asset : TenantEntity
{
    private Asset() { }
    public Asset(Guid tenantId, string assetCode, string name, string category)
    {
        TenantId = tenantId; AssetCode = assetCode; Name = name; Category = category;
    }
    public string AssetCode { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public string Category { get; private set; } = string.Empty;
    public string Condition { get; set; } = "Good";
}

public sealed class AssetAssignment : TenantEntity
{
    private AssetAssignment() { }
    public AssetAssignment(Guid tenantId, Guid assetId, Guid employeeId, DateOnly assignedOn)
    {
        TenantId = tenantId; AssetId = assetId; EmployeeId = employeeId; AssignedOn = assignedOn;
    }
    public Guid AssetId { get; private set; }
    public Guid EmployeeId { get; private set; }
    public DateOnly AssignedOn { get; private set; }
    public DateOnly? ReturnedOn { get; set; }
    public AssetAssignmentStatus Status { get; set; } = AssetAssignmentStatus.Assigned;
}

public sealed class Announcement : TenantEntity
{
    private Announcement() { }
    public Announcement(Guid tenantId, Guid authorEmployeeId, string title, string body)
    {
        TenantId = tenantId; AuthorEmployeeId = authorEmployeeId; Title = title; Body = body;
    }
    public Guid AuthorEmployeeId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Body { get; private set; } = string.Empty;
    public DateTimeOffset PublishedAt { get; set; } = DateTimeOffset.UtcNow;
}

public sealed class Notification : TenantEntity
{
    private Notification() { }
    public Notification(Guid tenantId, Guid userId, string title, string message)
    {
        TenantId = tenantId; UserId = userId; Title = title; Message = message;
    }
    public Guid UserId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Message { get; private set; } = string.Empty;
    public NotificationChannel Channel { get; set; } = NotificationChannel.InApp;
    public DateTimeOffset? ReadAt { get; set; }
}

public sealed class AuditLog : TenantEntity
{
    private AuditLog() { }
    public AuditLog(Guid tenantId, string actor, string action, string entityName, Guid? entityId)
    {
        TenantId = tenantId; Actor = actor; Action = action; EntityName = entityName; EntityId = entityId;
    }
    public string Actor { get; private set; } = string.Empty;
    public string Action { get; private set; } = string.Empty;
    public string EntityName { get; private set; } = string.Empty;
    public Guid? EntityId { get; private set; }
    public string? MetadataJson { get; set; }
}
