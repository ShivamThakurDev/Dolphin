using Dolphin.BLL.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService; 
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        { 
            var result = await _taskService.GetAllTasks();
            return Ok(result);
        }
    }
}
