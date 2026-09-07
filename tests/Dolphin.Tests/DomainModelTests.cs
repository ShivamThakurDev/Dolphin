using Dolphin.Domain.Enums;
using Dolphin.Domain.Hrms;
using FluentAssertions;

namespace Dolphin.Tests;

public sealed class DomainModelTests
{
    [Fact]
    public void Employee_exposes_full_name_and_tenant_identity()
    {
        var tenantId = Guid.NewGuid();
        var employee = new Employee(tenantId, "DOL-001", "Shivam", "Kumar", "shivam@dolphin.local");

        employee.TenantId.Should().Be(tenantId);
        employee.FullName.Should().Be("Shivam Kumar");
        employee.Status.Should().Be(EmploymentStatus.Active);
    }

    [Fact]
    public void Leave_request_starts_pending_for_approval_workflow()
    {
        var request = new LeaveRequest(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(),
            new DateOnly(2026, 8, 28), new DateOnly(2026, 8, 29), "Family event");

        request.Status.Should().Be(LeaveRequestStatus.Pending);
    }
}
