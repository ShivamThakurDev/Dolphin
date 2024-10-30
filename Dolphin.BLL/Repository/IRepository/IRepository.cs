using Dolphin.DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.BLL.Repository.IRepository
{
    public interface IRepository<T> where T : BaseEntity
    {
        IEnumerable<T> GetAll();
        T GetById(Guid Id);
        void Add(T entity);
        void AddAll(List<T> entity);
        void Update(T entity);
        void Delete(T entity);
        Task<T> Find(Expression<Func<T, bool>> predicate);
        IQueryable<T> Query<T>() where T : class;
    }
}
