using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tigets.Core.Models;
using Tigets.Core.Services;

namespace Tigets.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [Authorize]
        [HttpPatch("Balance")]
        public async Task<IActionResult> AddBalance(decimal amount)
        {
            var username = User.Identity?.Name;

            try
            {
                await _accountService.AddBalance(username, amount);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromQuery] string username, [FromHeader(Name = "password")] string password)
        {
            if (User.Identity.IsAuthenticated)
                return BadRequest("User is already logged in");

            try
            {
                await _accountService.Login(username, password);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserPostModel userPostModel)
        {
            try
            {
                await _accountService.Register(userPostModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        [Authorize]
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _accountService.Logout();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        public string GetAppInfo()
        {
            return _accountService.GetAppInfo();
        }

        public async Task<IActionResult> GetProfileData()
        {
            UserViewModel user;
            try
            {
                var name = User.Identity?.Name ?? throw new Exception("User does not exist");
                user = await _accountService.GetProfileData(username: name);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(user);
        }

        [Authorize]
        [HttpGet("IsUserVerified")]
        public async Task<IActionResult> GetVerificationStatus()
        {
            UserViewModel user;
            string filePath;
            string[] verifiedUsers;

            try{
                filePath = "VerifiedUsers.txt";
                verifiedUsers = await System.IO.File.ReadAllLinesAsync(filePath);
            }
            catch (FileNotFoundException ex)
            {
                return Ok("User is not verified");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }

            var name = User.Identity?.Name ?? throw new Exception("User does not exist");
            user = await _accountService.GetProfileData(username: name);

            if (!verifiedUsers.Contains(name))
            {
                return Ok("User is not verified");
            }
            else
            {
                return Ok("User is verified");
            }
        }
    }
}