using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;
using Tigets.Core.Models;

namespace Tigets.Core.Services
{
    public class AdminVerificationService : IAdminVerificationService
    {
        private readonly SignInManager<Admin> _signInManager;
        private readonly UserManager<Admin> _userManager;
        private readonly IMapper _mapper;
        private readonly Lazy<Reading> _reading;

        public AdminVerificationService(
            SignInManager<Admin> signInManager,
            UserManager<Admin> userManager,
            IMapper mapper
        )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _reading = new Lazy<Reading>();
        }

    

        public async Task Login(string username, string password)
        {
            if (username is null)
                throw new ArgumentNullException($"{nameof(username)}");

            if (password is null)
                throw new ArgumentNullException($"{nameof(password)}");

            var admin = await _userManager.FindByNameAsync(username);

            if (admin is null)
                throw new Exception("Admin does not exist.");

            if (!await _userManager.CheckPasswordAsync(admin, password))
                throw new Exception("Incorrect password.");

            var result = await _signInManager.PasswordSignInAsync(admin, password, false, false);

            if (!result.Succeeded)
                throw new Exception(result.ToString());
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<UserViewModel> GetProfileData(string username)
        {
            var userData = await _userManager.FindByNameAsync(username);
            if (userData is null)
            {
                throw new Exception("Admin does not exist.");
            }

            return _mapper.Map<UserViewModel>(userData);
        }

public async Task VerifyUser(UserPostModel userPostModel)
        {
            
        }

        public string GetAppInfo()
        {
            return _reading.Value.AppInfo;
        }

    }
}
