using System.Linq.Expressions;
using Dolphin.Domain.Common;

namespace Dolphin.Application.Common;

public sealed record ApiError(string Code, string Message, string? Field = null);
public sealed record PagedRequest(int PageNumber = 1, int PageSize = 20, string? SortBy = null, string? SortDirection = null);
public sealed record PagedResult<T>(IReadOnlyList<T> Items, int PageNumber, int PageSize, int TotalCount);

public sealed class ApiResponse<T>
{
    public bool Success { get; init; }
    public T? Data { get; init; }
    public IReadOnlyList<ApiError> Errors { get; init; } = [];
    public string TraceId { get; init; } = string.Empty;
    public static ApiResponse<T> Ok(T data, string traceId = "") => new() { Success = true, Data = data, TraceId = traceId };
    public static ApiResponse<T> Fail(IEnumerable<ApiError> errors, string traceId = "") => new() { Success = false, Errors = errors.ToList(), TraceId = traceId };
}

public interface ITenantContext
{
    Guid TenantId { get; }
    string? UserId { get; }
    string? UserEmail { get; }
}

public interface ICurrentUserService
{
    string UserId { get; }
    string Email { get; }
    IReadOnlyCollection<string> Roles { get; }
}

public interface IApplicationDbContext
{
    IQueryable<T> Query<T>() where T : BaseEntity;
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

public interface IRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<T>> ListAsync(ISpecification<T>? specification = null, CancellationToken cancellationToken = default);
    Task AddAsync(T entity, CancellationToken cancellationToken = default);
    void Update(T entity);
    void Remove(T entity);
}

public interface ISpecification<T>
{
    Expression<Func<T, bool>>? Criteria { get; }
    Func<IQueryable<T>, IOrderedQueryable<T>>? OrderBy { get; }
    int? Skip { get; }
    int? Take { get; }
}

public abstract class Specification<T> : ISpecification<T>
{
    public Expression<Func<T, bool>>? Criteria { get; protected init; }
    public Func<IQueryable<T>, IOrderedQueryable<T>>? OrderBy { get; protected init; }
    public int? Skip { get; protected init; }
    public int? Take { get; protected init; }
}

public interface IJwtTokenService
{
    Task<AuthResult> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);
    Task<AuthResult> RefreshAsync(RefreshTokenRequest request, CancellationToken cancellationToken = default);
}

public interface IPasswordHasher
{
    string Hash(string password);
    bool Verify(string password, string passwordHash);
}

public interface IFileStorageService
{
    Task<StoredFile> SaveAsync(Stream content, string fileName, string contentType, CancellationToken cancellationToken = default);
    Task<Stream> OpenReadAsync(string storageKey, CancellationToken cancellationToken = default);
}

public sealed record StoredFile(string StorageKey, string FileName, string ContentType, long Length);
public sealed record LoginRequest(string Email, string Password, string? TenantSlug, string? DeviceName);
public sealed record RefreshTokenRequest(string RefreshToken, string? DeviceName);
public sealed record AuthResult(string AccessToken, string RefreshToken, DateTimeOffset ExpiresAt, UserProfileDto User);
public sealed record UserProfileDto(Guid UserId, Guid TenantId, string Email, string DisplayName, IReadOnlyCollection<string> Roles, Guid? EmployeeId = null);
