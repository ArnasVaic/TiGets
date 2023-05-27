using Tigets.Core.Models;

namespace Tigets.Core.Services
{
    public interface IAdminVerificationService
    {
        Task Login(string username, string password);
        Task Logout();
        Task VerifyUser(UserPostModel user);
        string GetAppInfo();
    }
}