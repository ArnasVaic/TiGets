using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Tigets.Core.Models;
using Tigets.Core.Repositories;

namespace Tigets.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        public AccountController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet("Login")]
        public async Task<IActionResult> Login([FromQuery] string username, [FromQuery] string password)
        {
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromQuery] string username, [FromQuery] string password)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user != null)
                throw new Exception("User with this username already exists");

            user = new IdentityUser(username) { EmailConfirmed = true };
            await _userManager.CreateAsync(user, password);

            return Ok();
        }
    }
}
