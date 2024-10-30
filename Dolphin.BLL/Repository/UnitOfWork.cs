using Dolphin.BLL.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.BLL.Repository
{
    public class UnitOfWork<T> : IUnitOfWork<T> where T : class
    {
        private readonly DbContext _db;
        public async Task Add(T obj)
        {
            await _db.Set<T>().AddAsync(obj);
        }

        public void Delete(T obj)
        {
            _db.Set<T>().Remove(obj);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _db.Set<T>().ToListAsync();
        }

        public void Update(T obj)
        {
            _db.Set<T>().Update(obj);
        }

        public int Save()
        {
            return _db.SaveChanges();
        }

        public async Task<T> GetById(Guid id)
        {
            return await _db.Set<T>().FindAsync(id);
        }
    }
}
