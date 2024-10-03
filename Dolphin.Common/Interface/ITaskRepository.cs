using Dolphin.Common.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.Common.Interface
{
    public interface ITaskRepository: IGenricRepository<Task>
    {
        Task<bool> CreateTask (Tasks task);
        Task<IEnumerable<Tasks>> GetAllTasks();
        Task<Tasks> GetTaskById(Guid Id);
        Task<bool> UpdateTask (Tasks task);
        Task<bool> DeleteTask(Guid Id);
    }
}
