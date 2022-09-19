using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Tigets.Core.Models;
using Tigets.Core.Repositories;

namespace Tigets.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public AccountController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromQuery] string username, 
            [FromQuery] string passwordHash
        )
        {
            if (username == "admin" && password == "123")
            {
                var claims = new List<Claim>();
                claims.Add(new Claim("username", username));
                claims.Add(new Claim(ClaimTypes.NameIdentifier, username));
                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
                await HttpContext.SignInAsync(claimsPrincipal);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromQuery] string username, [FromQuery] string passwordHash)
        {
            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Name = username,
                Surname = username,
                Username = username,
                PasswordHash = passwordHash,
                Email = "",
                Balance = 0,
                PhoneNumber = ""
            };
            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();
            return Ok();
        }
    }
}
