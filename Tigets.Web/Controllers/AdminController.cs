using System;
using AutoMapper;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tigets.Infrastructure;
using Tigets.Core.Models;
using Tigets.Core.Services;
using Microsoft.AspNetCore.Authorization;

namespace Tigets.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;

        public AdminController(IMapper mapper, IAccountService accountService)
        {
            _mapper = mapper;
            _accountService = accountService;
        }

        [Authorize]
        [HttpPost("VerifyUser")]
        public async Task<IActionResult> VerifyUser(string username)
        {
            UserViewModel user;
            var name = User.Identity?.Name ?? throw new Exception("User does not exist");
            user = await _accountService.GetProfileData(username: name);

            if (user.UserName != "Admin")
                return BadRequest("User is not an admin");

            try
            {
                string filePath = "VerifiedUsers.txt";

                string[] lines = System.IO.File.ReadAllLines(filePath);
                foreach (string line in lines)
                {
                    if (line == username)
                        return BadRequest($"User {username} is already verified");
                }

                using (StreamWriter writer = new StreamWriter(filePath, append: true))
                {
                    await writer.WriteLineAsync(username);
                }

                return Ok($"User {username} verification was successful");
            }
            catch(FileNotFoundException ex){
                return Ok($"User {username} verification was successful");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }

        // public async Task<IActionResult> GetProfileData()
        // {
        //     UserViewModel user;
        //     try
        //     {
        //         var name = User.Identity?.Name ?? throw new Exception("User does not exist");
        //         user = await _accountService.GetProfileData(username: name);
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest(ex.Message);
        //     }
        //     return Ok(user);
        // }
    }
}