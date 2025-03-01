using Dolphin.DAL.DTOs;
using Dolphin.DAL.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public UserController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("GetUsersByAgencyId/{agencyId}")]
        public async Task<IActionResult> GetUsersByAgencyId(Guid agencyId)
        {
            var users =  _userManager.Users.Where(x => x.AgencyId == agencyId).ToList();
            var userList  = new List<object>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var role = roles.FirstOrDefault();
                var roleDetails = new object();
                if(string.IsNullOrEmpty(role))
                {
                    var roleEntity = await _roleManager.FindByNameAsync(role);
                    if(roleEntity != null)
                    {
                        roleDetails = new
                        {
                            Id = roleEntity.Id,
                            Name = roleEntity.Name
                        };
                    }
                }
                userList.Add(new
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    AgencyId = user.AgencyId,
                    Role = roleDetails
                });
            }
            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult> PostUserAsync(UserRequestDto userDTO)
        {
            if (userDTO != null)
            {
                var user = new User
                {
                    UserName = userDTO.FirstName + "" + userDTO.LastName,
                    Email = userDTO.Email,
                    FirstName = userDTO.FirstName,
                    LastName = userDTO.LastName,
                    PhoneNumber = userDTO.PhoneNumber
                };
                var result = await _userManager.CreateAsync(user, userDTO.Password);

                if (!result.Succeeded)
                {
                    // Return detailed error messages
                    return BadRequest(new { Message = "User creation failed", Errors = result.Errors });
                }
                // Assign role to user if a valid RoleId is provided
                if (!string.IsNullOrEmpty(userDTO.RoleId))
                {
                    var role = await _roleManager.FindByIdAsync(userDTO.RoleId);
                    if (role != null)
                    {
                        await _userManager.AddToRoleAsync(user, role.Name);
                    }
                    else
                    {
                        // Return 400 status with specific error message
                        return BadRequest(new { Message = "Invalid Role", StatusCode = 400 });
                    }
                }

                // Return 200 OK status if everything succeeds
                return Ok(new { Message = "User created successfully", StatusCode = 200 });
            }
            return BadRequest(new { Message = "Invalid Object", StatusCode = 400 });
        }

        [HttpPost("AssignRole")]
        public async Task<IActionResult> AssignRole(string userId, string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found.");

            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (result.Succeeded) return Ok(new { Message = "Role assigned successfully." });

            return BadRequest(result.Errors);
        }

        [HttpGet("GetAll")]
        public IActionResult GetUsers()
        {
            var users = _userManager.Users.ToList();
            return Ok(users);
        }
    }
}
