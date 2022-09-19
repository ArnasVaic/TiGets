using Tigets.Core.Models;
using Tigets.Core.Repositories;

namespace Tigets.Web.Commons
{
    public static class ServiceInjectorExtensions
    {
        public static void InjectServices(this IServiceCollection services)
        {
            services.AddScoped<ITigetsRepository<User>, TigetsRepository<User>>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
