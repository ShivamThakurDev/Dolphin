using Dolphin.BLL.Repository.IRepository;
using Dolphin.DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.BLL.Services.IServices
{
    public interface ITaskService: IRepository<Tasks>
    {
        Task<IEnumerable<Tasks>> GetAllTasks();
        Tasks GetById(Guid id);
        void Add(Tasks task);
        void Update(Tasks task);
        void Delete(Guid id);

    }
}
