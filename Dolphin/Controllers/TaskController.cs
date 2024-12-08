using Dolphin.BLL.Services.IServices;
using Dolphin.DAL.DTOs;
using Dolphin.DAL.Model;
using Microsoft.AspNetCore.Http.HttpResults;
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
        public async Task<ActionResult<IEnumerable<TaskResponseDto>>> GetAll()
        {
            var tasks = await _taskService.GetAllTasks();
            return Ok(tasks);
        }


        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(Guid Id)
        {
            var result = _taskService.GetById(Id);
            return Ok(result);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(TaskRequestDto taskDto)
        {
            _taskService.Add(taskDto);
            return Created();
        }
        [HttpPut]
        public async Task<IActionResult> Edit(string id, TaskRequestDto taskDto)
        {
            _taskService.Update(id,taskDto);
            return Created();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            _taskService.Delete(id);
            return Ok();
        }
    }
}
