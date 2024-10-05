using Dolphin.Common.Data;
using Dolphin.Common.Interface;
using Dolphin.Common.Model;
using Dolphin.Common.Repository;

namespace Dolphin.BLL.Repository
{
    public class TaskRespository: GenericRepository<Task>, ITaskRepository
    {
        public TaskRespository(ApplicationManagerContext db):base(db)
        {
            
        }

        public Task<bool> CreateTask(Tasks task)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTask(Guid Id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Tasks>> GetAllTasks()
        {
            throw new NotImplementedException();
        }

        public Task<Tasks> GetTaskById(Guid Id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateTask(Tasks task)
        {
            throw new NotImplementedException();
        }
    }
}
