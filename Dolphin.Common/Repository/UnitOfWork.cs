using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dolphin.Common.Interface;

namespace Dolphin.BLL.Repository
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly ApplicationManagerContext _db;
        public ITaskRepository Tasks { get; }
        public UnitOfWork(ApplicationManagerContext db, ITaskRepository taskRepository)
        {
            _db = db;
            Tasks = taskRepository;

        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public int Save()
        {
            return _db.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
        }
    }
}
