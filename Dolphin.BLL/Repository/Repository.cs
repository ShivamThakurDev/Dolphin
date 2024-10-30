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
        private DbSet<T> _db;
        // Initalize the constructor class with dependency injection
        public Repository(ApplicationManagerContext context)
        {
            this._context = context;
            _db = context.Set<T>();
            
        }
        // Add a single record in db
        public void Add(T entity)
        {
            if(entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            _db.Add(entity);
            _context.SaveChanges();
        }
        // Adding the multiple of record in db
        public void AddAll(List<T> entityList)
        {
            if (!entityList.Any())
            {
                throw new ArgumentNullException(nameof(entityList));
            }
            _db.AddRange(entityList);
            _context.SaveChanges();
        }

      
        // Soft Deleting record from db
        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            entity.IsDeleted = true;
            _context.SaveChanges();
        }
        // Get by find record from db 
        public async virtual Task<T> Find(Expression<Func<T, bool>> predicate)
        {
            return await _db.FirstOrDefaultAsync(predicate);
        }
        // Get all records from db
        public IEnumerable<T> GetAll()
        {
            return _db.AsEnumerable();
        }
        // Get the record by Id
        public T GetById(Guid Id)
        {
            return _db.Find(Id);
        }
        // Get list or records
        public IQueryable<T> Query<T>() where T : class
        {
            return _context.Set<T>().AsNoTracking();
        }
        // Used existing record to update and save changes in db
        public void Update(T entity)
        {
            if(entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            _db.Update(entity);
            _context.SaveChanges();
        }
    }
}
