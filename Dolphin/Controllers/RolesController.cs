using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public RolesController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        [HttpPost("AddRole")]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            if (string.IsNullOrEmpty(roleName)) return BadRequest("Role name cannot be empty.");

            var result = await _roleManager.CreateAsync(new IdentityRole { Name = roleName });
            if (result.Succeeded) return Ok(new { Message = "Role created successfully." });

            return BadRequest(result.Errors);
        }

        [HttpGet("GetRoles")]
        public IActionResult GetRoles()
        {
            var roles = _roleManager.Roles.ToList();
            return Ok(roles);
        }
    }
}
