using Dolphin.Application.Common;
using Dolphin.Domain.Enums;
using Dolphin.Domain.Hrms;
using Dolphin.Domain.Identity;
using Dolphin.Domain.Projects;
using Dolphin.Infrastructure.Persistence;
using Dolphin.Infrastructure.Security;
using Dolphin.Infrastructure.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Dolphin.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<DolphinDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<DolphinDbContext>());
        services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IJwtTokenService, JwtTokenService>();
        services.AddScoped<IFileStorageService, LocalFileStorageService>();

        var redis = configuration.GetConnectionString("Redis");
        if (!string.IsNullOrWhiteSpace(redis))
        {
            services.AddStackExchangeRedisCache(options => options.Configuration = redis);
        }
        else
        {
            services.AddDistributedMemoryCache();
        }

        return services;
    }

    public static async Task SeedDemoDataAsync(this IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<DolphinDbContext>();
        await db.Database.EnsureCreatedAsync();

        if (await db.Tenants.IgnoreQueryFilters().AnyAsync())
        {
            if (!await db.Roles.IgnoreQueryFilters().AnyAsync())
            {
                var existingTenant = await db.Tenants.IgnoreQueryFilters().FirstAsync();
                var rAdmin = new Role(existingTenant.Id, "Admin", "System Administrator with full permissions");
                var rHr = new Role(existingTenant.Id, "HRAdmin", "Human Resources manager and attendance controller");
                var rEmp = new Role(existingTenant.Id, "Employee", "Standard employee role for tasks and attendance");
                var rPm = new Role(existingTenant.Id, "ProjectManager", "Project and sprint management lead");
                db.Roles.AddRange(rAdmin, rHr, rEmp, rPm);
                await db.SaveChangesAsync();
            }
            return;
        }

        var hasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();
        var tenant = new Tenant("Dolphin Demo Pvt Ltd", "demo", "demo.dolphin.local");
        db.Tenants.Add(tenant);

        var hr = new Department(tenant.Id, "Human Resources", "HR");
        var engineering = new Department(tenant.Id, "Engineering", "ENG");
        var developer = new Designation(tenant.Id, "Software Engineer");
        var location = new WorkLocation(tenant.Id, "Head Office", "Mohali", "India");
        db.AddRange(hr, engineering, developer, location);

        var employee = new Employee(tenant.Id, "DOL-001", "Shivam", "Kumar", "shivam@dolphin.local")
        {
            DepartmentId = engineering.Id,
            DesignationId = developer.Id,
            WorkLocationId = location.Id
        };
        db.Employees.Add(employee);
        db.LeavePolicies.Add(new LeavePolicy(tenant.Id, "Earned Leave", 18));
        db.Assets.Add(new Asset(tenant.Id, "LAP-HP-I7", "HP EliteBook i7", "Computer Hardware"));
        db.Announcements.Add(new Announcement(tenant.Id, employee.Id, "Welcome to Dolphin", "Your HRMS core workspace is ready for onboarding, leave, attendance and assets."));

        var agency = new Agency(tenant.Id, "Acme Digital Agency", "Full-service enterprise digital & development agency", "contact@acme.local", "+1-555-0199", "Alex Morgan", "United States", "New York");
        db.Agencies.Add(agency);

        var task1 = new ProjectTask(tenant.Id, "Build Core HRMS Engine", "Establish Clean Architecture foundation, entities, and CQRS handlers", ProjectTaskStatus.Done, TaskPriority.Urgent, 100, 8, DateTimeOffset.UtcNow.AddDays(-10), DateTimeOffset.UtcNow.AddDays(-2), null, employee.Id, agency.Id);
        var task2 = new ProjectTask(tenant.Id, "Migrate Angular 18 Enterprise UI", "Port task-management and HRMS workflows into unified client", ProjectTaskStatus.InProgress, TaskPriority.High, 65, 13, DateTimeOffset.UtcNow.AddDays(-5), DateTimeOffset.UtcNow.AddDays(3), null, employee.Id, agency.Id);
        var task3 = new ProjectTask(tenant.Id, "Setup SignalR Real-Time Alerts", "Integrate SignalR notification hub with task assignment and status change alerts", ProjectTaskStatus.Todo, TaskPriority.Medium, 20, 5, DateTimeOffset.UtcNow, DateTimeOffset.UtcNow.AddDays(7), null, employee.Id, agency.Id);
        db.Tasks.AddRange(task1, task2, task3);

        var user = new User(tenant.Id, "admin@dolphin.local", "Dolphin Admin", hasher.Hash("Admin@12345")) { EmployeeId = employee.Id };
        db.Users.Add(user);
        await db.SaveChangesAsync();
    }
}
