namespace Dolphin.Domain.Enums;

public enum EmploymentStatus { Draft = 0, Active = 1, OnNotice = 2, Exited = 3 }
public enum AttendanceStatus { Present = 1, Absent = 2, Remote = 3, Leave = 4, Holiday = 5 }
public enum LeaveRequestStatus { Pending = 0, Approved = 1, Rejected = 2, Cancelled = 3 }
public enum AssetAssignmentStatus { Assigned = 0, Acknowledged = 1, Returned = 2, Lost = 3, Damaged = 4 }
public enum NotificationChannel { InApp = 0, Email = 1, Sms = 2 }
public enum DocumentStatus { Pending = 0, Verified = 1, Rejected = 2 }
