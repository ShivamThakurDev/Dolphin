using Dolphin.BLL.Repository.IRepository;
using Dolphin.DAL.Data;
using Dolphin.DAL.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.BLL.Repository
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly ApplicationManagerContext _context;
        private DbSet<T> db;
        public Repository(ApplicationManagerContext context)
        {
            this._context = context;
            db = context.Set<T>();
            
        }
        public void Add(T entity)
        {
            if(entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            db.Add(entity);
        }

        public void AddAll(List<T> entity)
        {
            throw new NotImplementedException();
        }

        public Guid AddRecord(T entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public Task<T> Find(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> GetAll()
        {
            throw new NotImplementedException();
        }

        public T GetById(Guid Id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<T1> Query<T1>() where T1 : class
        {
            throw new NotImplementedException();
        }

        public void Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
