using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.BLL.Repository.IRepository
{
    public interface IUnitOfWork<T> where T: class
    {
        Task Add(T obj);
        void Delete(T obj);
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(Guid id);
        void Update(T obj);
        int Save(); 

    }
}
