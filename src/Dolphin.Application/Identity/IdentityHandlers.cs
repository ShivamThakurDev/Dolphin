using Dolphin.Application.Common;
using Dolphin.Domain.Identity;
using MediatR;

namespace Dolphin.Application.Identity;

public sealed record ListUsersQuery : IRequest<IReadOnlyList<UserItemDto>>;
public sealed record GetUserByIdQuery(Guid Id) : IRequest<UserItemDto?>;
public sealed record CreateUserCommand(CreateUserRequest Request) : IRequest<UserItemDto>;
public sealed record UpdateUserCommand(Guid Id, UpdateUserRequest Request) : IRequest<UserItemDto>;
public sealed record DeleteUserCommand(Guid Id) : IRequest<bool>;
public sealed record AssignRoleCommand(AssignRoleRequest Request) : IRequest<bool>;

public sealed record ListRolesQuery : IRequest<IReadOnlyList<RoleItemDto>>;
public sealed record GetRoleByIdQuery(Guid Id) : IRequest<RoleItemDto?>;
public sealed record CreateRoleCommand(CreateRoleRequest Request) : IRequest<RoleItemDto>;
public sealed record UpdateRoleCommand(Guid Id, UpdateRoleRequest Request) : IRequest<RoleItemDto>;
public sealed record DeleteRoleCommand(Guid Id) : IRequest<bool>;

public sealed class IdentityHandlers(
    IApplicationDbContext dbContext,
    IRepository<User> users,
    IRepository<Role> roles,
    ITenantContext tenantContext,
    IPasswordHasher passwordHasher)
    : IRequestHandler<ListUsersQuery, IReadOnlyList<UserItemDto>>,
      IRequestHandler<GetUserByIdQuery, UserItemDto?>,
      IRequestHandler<CreateUserCommand, UserItemDto>,
      IRequestHandler<UpdateUserCommand, UserItemDto>,
      IRequestHandler<DeleteUserCommand, bool>,
      IRequestHandler<AssignRoleCommand, bool>,
      IRequestHandler<ListRolesQuery, IReadOnlyList<RoleItemDto>>,
      IRequestHandler<GetRoleByIdQuery, RoleItemDto?>,
      IRequestHandler<CreateRoleCommand, RoleItemDto>,
      IRequestHandler<UpdateRoleCommand, RoleItemDto>,
      IRequestHandler<DeleteRoleCommand, bool>
{
    public Task<IReadOnlyList<UserItemDto>> Handle(ListUsersQuery request, CancellationToken cancellationToken)
    {
        var rawUsers = dbContext.Query<User>()
            .Where(u => !u.IsDeleted)
            .OrderBy(u => u.DisplayName)
            .ToList();

        var userIds = rawUsers.Select(u => u.Id).ToList();
        var userRoles = dbContext.Query<UserRole>()
            .Where(ur => userIds.Contains(ur.UserId))
            .ToList();

        var roleIds = userRoles.Select(ur => ur.RoleId).Distinct().ToList();
        var roleMap = dbContext.Query<Role>()
            .Where(r => roleIds.Contains(r.Id))
            .ToDictionary(r => r.Id, r => r.Name);

        var userRoleMap = userRoles
            .GroupBy(ur => ur.UserId)
            .ToDictionary(g => g.Key, g => roleMap.TryGetValue(g.First().RoleId, out var rName) ? rName : "Admin");

        var list = rawUsers.Select(u => new UserItemDto(
            u.Id,
            u.DisplayName,
            u.Email,
            userRoleMap.TryGetValue(u.Id, out var rName) ? rName : "Admin"
        )).ToList();

        return Task.FromResult<IReadOnlyList<UserItemDto>>(list);
    }

    public Task<UserItemDto?> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        var user = dbContext.Query<User>()
            .FirstOrDefault(u => u.Id == request.Id && !u.IsDeleted);

        if (user is null) return Task.FromResult<UserItemDto?>(null);

        var userRole = dbContext.Query<UserRole>()
            .FirstOrDefault(ur => ur.UserId == user.Id);

        string roleName = "Admin";
        if (userRole != null)
        {
            var r = dbContext.Query<Role>().FirstOrDefault(ro => ro.Id == userRole.RoleId);
            if (r != null) roleName = r.Name;
        }

        return Task.FromResult<UserItemDto?>(new UserItemDto(user.Id, user.DisplayName, user.Email, roleName));
    }

    public async Task<UserItemDto> Handle(CreateUserCommand command, CancellationToken cancellationToken)
    {
        var r = command.Request;
        var hash = passwordHasher.Hash(string.IsNullOrWhiteSpace(r.Password) ? "Dolphin@123" : r.Password);
        var user = new User(tenantContext.TenantId, r.Email, r.Name ?? r.Email, hash);

        var assignedRoleName = "Admin";
        if (!string.IsNullOrWhiteSpace(r.Role))
        {
            var roleEntity = dbContext.Query<Role>()
                .FirstOrDefault(ro => ro.Name.ToLower() == r.Role.ToLower() || ro.Id.ToString() == r.Role);
            if (roleEntity != null)
            {
                user.AddRole(roleEntity.Id);
                assignedRoleName = roleEntity.Name;
            }
        }

        await users.AddAsync(user, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new UserItemDto(user.Id, user.DisplayName, user.Email, assignedRoleName);
    }

    public async Task<UserItemDto> Handle(UpdateUserCommand command, CancellationToken cancellationToken)
    {
        var user = await users.GetByIdAsync(command.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"User {command.Id} not found");

        if (!string.IsNullOrWhiteSpace(command.Request.Name))
        {
            user.DisplayName = command.Request.Name;
        }

        var assignedRoleName = command.Request.Role ?? "Admin";
        if (!string.IsNullOrWhiteSpace(command.Request.Role))
        {
            var roleEntity = dbContext.Query<Role>()
                .FirstOrDefault(ro => ro.Name.ToLower() == command.Request.Role.ToLower() || ro.Id.ToString() == command.Request.Role);
            if (roleEntity != null)
            {
                var existingUserRoles = dbContext.Query<UserRole>().Where(ur => ur.UserId == user.Id).ToList();
                foreach (var ur in existingUserRoles)
                {
                    ur.IsDeleted = true;
                }
                user.AddRole(roleEntity.Id);
                assignedRoleName = roleEntity.Name;
            }
        }

        users.Update(user);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new UserItemDto(user.Id, user.DisplayName, user.Email, assignedRoleName);
    }

    public async Task<bool> Handle(DeleteUserCommand command, CancellationToken cancellationToken)
    {
        var user = await users.GetByIdAsync(command.Id, cancellationToken);
        if (user is null) return false;
        user.IsDeleted = true;
        users.Update(user);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> Handle(AssignRoleCommand command, CancellationToken cancellationToken)
    {
        var user = await users.GetByIdAsync(command.Request.UserId, cancellationToken);
        if (user is null) return false;
        user.AddRole(command.Request.RoleId);
        users.Update(user);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public Task<IReadOnlyList<RoleItemDto>> Handle(ListRolesQuery request, CancellationToken cancellationToken)
    {
        var list = dbContext.Query<Role>()
            .Where(r => !r.IsDeleted)
            .OrderBy(r => r.Name)
            .Select(r => new RoleItemDto(r.Id, r.Name, r.Description))
            .ToList();

        return Task.FromResult<IReadOnlyList<RoleItemDto>>(list);
    }

    public Task<RoleItemDto?> Handle(GetRoleByIdQuery request, CancellationToken cancellationToken)
    {
        var role = dbContext.Query<Role>()
            .Where(r => r.Id == request.Id && !r.IsDeleted)
            .Select(r => new RoleItemDto(r.Id, r.Name, r.Description))
            .FirstOrDefault();

        return Task.FromResult(role);
    }

    public async Task<RoleItemDto> Handle(CreateRoleCommand command, CancellationToken cancellationToken)
    {
        var role = new Role(tenantContext.TenantId, command.Request.Name, command.Request.Description ?? string.Empty);
        await roles.AddAsync(role, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new RoleItemDto(role.Id, role.Name, role.Description);
    }

    public async Task<RoleItemDto> Handle(UpdateRoleCommand command, CancellationToken cancellationToken)
    {
        var role = await roles.GetByIdAsync(command.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"Role {command.Id} not found");

        role.Description = command.Request.Description ?? role.Description;
        roles.Update(role);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new RoleItemDto(role.Id, role.Name, role.Description);
    }

    public async Task<bool> Handle(DeleteRoleCommand command, CancellationToken cancellationToken)
    {
        var role = await roles.GetByIdAsync(command.Id, cancellationToken);
        if (role is null) return false;
        role.IsDeleted = true;
        roles.Update(role);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}
