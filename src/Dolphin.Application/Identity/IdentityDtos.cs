namespace Dolphin.Application.Identity;

public sealed record UserItemDto(Guid Id, string Name, string Email, string? Role = null);
public sealed record RoleItemDto(Guid Id, string Name, string? Description = null);

public sealed record CreateUserRequest(string? Name, string Email, string? Password, string? Role);
public sealed record UpdateUserRequest(string? Name, string Email, string? Role);
public sealed record AssignRoleRequest(Guid UserId, Guid RoleId);

public sealed record CreateRoleRequest(string Name, string? Description);
public sealed record UpdateRoleRequest(string Name, string? Description);
