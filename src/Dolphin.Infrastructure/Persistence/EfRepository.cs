using Dolphin.Application.Common;
using Dolphin.Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace Dolphin.Infrastructure.Persistence;

public sealed class EfRepository<T>(DolphinDbContext dbContext) : IRepository<T> where T : BaseEntity
{
    public Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
        dbContext.Set<T>().FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

    public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T>? specification = null, CancellationToken cancellationToken = default)
    {
        IQueryable<T> query = dbContext.Set<T>();

        if (specification?.Criteria is not null)
        {
            query = query.Where(specification.Criteria);
        }

        if (specification?.OrderBy is not null)
        {
            query = specification.OrderBy(query);
        }

        if (specification?.Skip is not null)
        {
            query = query.Skip(specification.Skip.Value);
        }

        if (specification?.Take is not null)
        {
            query = query.Take(specification.Take.Value);
        }

        return await query.ToListAsync(cancellationToken);
    }

    public async Task AddAsync(T entity, CancellationToken cancellationToken = default) =>
        await dbContext.Set<T>().AddAsync(entity, cancellationToken);

    public void Update(T entity) => dbContext.Set<T>().Update(entity);
    public void Remove(T entity) => dbContext.Set<T>().Remove(entity);
}
