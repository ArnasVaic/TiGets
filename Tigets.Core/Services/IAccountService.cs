using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tigets.Core.Models;

namespace Tigets.Core.Services
{
    public interface IAccountService
    {
        Task AddBalance(string username, decimal amount);
        Task Login(string username, string password);
        Task Register(UserPostModel userPostModel);
        Task<UserViewModel> GetProfileData(string username);
    }
}