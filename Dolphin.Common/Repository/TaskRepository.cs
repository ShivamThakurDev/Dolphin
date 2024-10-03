using Dolphin.Common.Interface;
using Dolphin.Common.Repository;

namespace Dolphin.BLL.Repository
{
    public class TaskRespository: GenericRepository<Task>, ITaskRepository
    {
        public TaskRespository(ApplicationManagerContext db):base(db)
        {
            
        }
    }
}
