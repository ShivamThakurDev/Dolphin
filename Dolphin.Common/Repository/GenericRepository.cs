using Dolphin.Common.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.Common.Repository
{
    public abstract class GenericRepository<T> : IGenricRepository<T> where T : class
    {
        private readonly ApplicationManagerContext _context;
        private readonly DbSet<T> _db;
        public GenericRepository(ApplicationManagerContext context)
        {
            _context = context;
            _db = context.Set<T>();
        }
        public async Task Add(T entity)
        {
            await _db.AddAsync(entity);
        }

        public void Delete(T entity)
        {
            _db.Remove(entity);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _db.ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _db.FindAsync(id);
        }

        public void Update(T entity)
        {
            _db.Update(entity);
        }
    }
}
