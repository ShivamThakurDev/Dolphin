using Dolphin.Application.Common;
using Dolphin.Domain.Hrms;
using FluentValidation;
using MediatR;

namespace Dolphin.Application.Hrms;

public sealed record ListEmployeesQuery(PagedRequest Page) : IRequest<PagedResult<EmployeeDto>>;
public sealed record CreateEmployeeCommand(CreateEmployeeRequest Request) : IRequest<EmployeeDto>;
public sealed record GetDashboardSummaryQuery : IRequest<DashboardSummaryDto>;
public sealed record ClockInCommand(ClockInRequest Request) : IRequest<AttendanceDto>;
public sealed record CreateLeaveCommand(CreateLeaveRequest Request) : IRequest<LeaveRequestDto>;
public sealed record CreateAnnouncementCommand(CreateAnnouncementRequest Request) : IRequest<AnnouncementDto>;

public sealed class CreateEmployeeValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeValidator()
    {
        RuleFor(x => x.Request.EmployeeCode).NotEmpty().MaximumLength(32);
        RuleFor(x => x.Request.FirstName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Request.LastName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Request.WorkEmail).NotEmpty().EmailAddress();
    }
}

public sealed class CreateLeaveValidator : AbstractValidator<CreateLeaveCommand>
{
    public CreateLeaveValidator()
    {
        RuleFor(x => x.Request.EmployeeId).NotEmpty();
        RuleFor(x => x.Request.LeavePolicyId).NotEmpty();
        RuleFor(x => x.Request.To).GreaterThanOrEqualTo(x => x.Request.From);
        RuleFor(x => x.Request.Reason).NotEmpty().MaximumLength(500);
    }
}

public sealed class HrmsHandlers(IRepository<Employee> employees, IRepository<AttendanceEntry> attendance,
    IRepository<LeaveRequest> leaveRequests, IRepository<Announcement> announcements, ITenantContext tenantContext,
    IApplicationDbContext dbContext)
    : IRequestHandler<ListEmployeesQuery, PagedResult<EmployeeDto>>,
      IRequestHandler<CreateEmployeeCommand, EmployeeDto>,
      IRequestHandler<GetDashboardSummaryQuery, DashboardSummaryDto>,
      IRequestHandler<ClockInCommand, AttendanceDto>,
      IRequestHandler<CreateLeaveCommand, LeaveRequestDto>,
      IRequestHandler<CreateAnnouncementCommand, AnnouncementDto>
{
    public async Task<PagedResult<EmployeeDto>> Handle(ListEmployeesQuery request, CancellationToken cancellationToken)
    {
        var page = request.Page.PageNumber < 1 ? 1 : request.Page.PageNumber;
        var size = request.Page.PageSize is < 1 or > 100 ? 20 : request.Page.PageSize;
        var query = dbContext.Query<Employee>().OrderBy(e => e.FirstName).ThenBy(e => e.LastName);
        var total = query.Count();
        var items = query.Skip((page - 1) * size).Take(size)
            .Select(e => new EmployeeDto(e.Id, e.EmployeeCode, e.FullName, e.WorkEmail, null, null, e.Status))
            .ToList();
        return await Task.FromResult(new PagedResult<EmployeeDto>(items, page, size, total));
    }

    public async Task<EmployeeDto> Handle(CreateEmployeeCommand command, CancellationToken cancellationToken)
    {
        var r = command.Request;
        var employee = new Employee(tenantContext.TenantId, r.EmployeeCode, r.FirstName, r.LastName, r.WorkEmail)
        {
            DepartmentId = r.DepartmentId,
            DesignationId = r.DesignationId
        };
        await employees.AddAsync(employee, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new EmployeeDto(employee.Id, employee.EmployeeCode, employee.FullName, employee.WorkEmail, null, null, employee.Status);
    }

    public async Task<DashboardSummaryDto> Handle(GetDashboardSummaryQuery request, CancellationToken cancellationToken)
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var employeesCount = dbContext.Query<Employee>().Count(e => e.Status == Domain.Enums.EmploymentStatus.Active);
        var leaveToday = dbContext.Query<LeaveRequest>().Count(l => l.From <= today && l.To >= today && l.Status == Domain.Enums.LeaveRequestStatus.Approved);
        var remote = dbContext.Query<AttendanceEntry>().Count(a => a.WorkDate == today && a.Status == Domain.Enums.AttendanceStatus.Remote);
        var feed = dbContext.Query<Announcement>().OrderByDescending(a => a.PublishedAt).Take(5)
            .Select(a => new AnnouncementDto(a.Id, a.Title, a.Body, a.PublishedAt)).ToList();
        return await Task.FromResult(new DashboardSummaryDto(employeesCount, leaveToday, remote, leaveToday, feed));
    }

    public async Task<AttendanceDto> Handle(ClockInCommand command, CancellationToken cancellationToken)
    {
        var entry = new AttendanceEntry(tenantContext.TenantId, command.Request.EmployeeId, DateOnly.FromDateTime(DateTime.UtcNow), DateTimeOffset.UtcNow);
        await attendance.AddAsync(entry, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new AttendanceDto(entry.Id, entry.EmployeeId, entry.WorkDate, entry.ClockIn, entry.ClockOut, entry.Status);
    }

    public async Task<LeaveRequestDto> Handle(CreateLeaveCommand command, CancellationToken cancellationToken)
    {
        var r = command.Request;
        var leave = new LeaveRequest(tenantContext.TenantId, r.EmployeeId, r.LeavePolicyId, r.From, r.To, r.Reason);
        await leaveRequests.AddAsync(leave, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new LeaveRequestDto(leave.Id, leave.EmployeeId, leave.From, leave.To, leave.Reason, leave.Status);
    }

    public async Task<AnnouncementDto> Handle(CreateAnnouncementCommand command, CancellationToken cancellationToken)
    {
        var r = command.Request;
        var announcement = new Announcement(tenantContext.TenantId, r.AuthorEmployeeId, r.Title, r.Body);
        await announcements.AddAsync(announcement, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new AnnouncementDto(announcement.Id, announcement.Title, announcement.Body, announcement.PublishedAt);
    }
}
