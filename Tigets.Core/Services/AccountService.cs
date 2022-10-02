using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using AutoMapper;
using Tigets.Core.Models;

namespace Tigets.Core.Services
{
    public class AccountService : IAccountService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public AccountService(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IMapper mapper
        )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task Login(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user is null)
                throw new Exception("User does not exist.");

            if (!await _userManager.CheckPasswordAsync(user, password))
                throw new Exception("Incorrect password.");

            var result = await _signInManager.PasswordSignInAsync(user, password, false, false);

            if (!result.Succeeded)
                throw new Exception(result.ToString());
        }

        public async Task Register(UserPostModel userPostModel)
        {
            var user = await _userManager.FindByNameAsync(userPostModel.UserName);
            if (user != null)
                throw new Exception("User with this username already exists.");

            user = _mapper.Map<User>(userPostModel);
            user.Id = Guid.NewGuid().ToString();
            user.Balance = 0m;
            user.EmailConfirmed = true;
            var result = await _userManager.CreateAsync(user, userPostModel.Password);

            if (!result.Succeeded)
                throw new Exception(result.ToString());
        }
    }
}
