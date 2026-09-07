using Dolphin.Domain.Enums;

namespace Dolphin.Application.Hrms;

public sealed record EmployeeDto(Guid Id, string EmployeeCode, string FullName, string WorkEmail, string? Department, string? Designation, EmploymentStatus Status);
public sealed record CreateEmployeeRequest(string EmployeeCode, string FirstName, string LastName, string WorkEmail, Guid? DepartmentId, Guid? DesignationId);
public sealed record DashboardSummaryDto(int Employees, int OnLeaveToday, int WorkingRemotely, int PendingActions, IReadOnlyList<AnnouncementDto> Announcements);
public sealed record AttendanceDto(Guid Id, Guid EmployeeId, DateOnly WorkDate, DateTimeOffset ClockIn, DateTimeOffset? ClockOut, AttendanceStatus Status);
public sealed record ClockInRequest(Guid EmployeeId);
public sealed record LeaveRequestDto(Guid Id, Guid EmployeeId, DateOnly From, DateOnly To, string Reason, LeaveRequestStatus Status);
public sealed record CreateLeaveRequest(Guid EmployeeId, Guid LeavePolicyId, DateOnly From, DateOnly To, string Reason);
public sealed record AssetDto(Guid Id, string AssetCode, string Name, string Category, string Condition);
public sealed record AssetAssignmentDto(Guid Id, Guid AssetId, Guid EmployeeId, DateOnly AssignedOn, AssetAssignmentStatus Status);
public sealed record AnnouncementDto(Guid Id, string Title, string Body, DateTimeOffset PublishedAt);
public sealed record CreateAnnouncementRequest(Guid AuthorEmployeeId, string Title, string Body);
