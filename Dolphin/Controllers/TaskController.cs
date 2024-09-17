using Dolphin.BLL.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        public readonly ITaskRepository _taskRepository;
        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _taskRepository.GetAllTasks();
            if(list== null)
            {
                return NotFound();
            }
            return Ok(list);
        }


    }
}
