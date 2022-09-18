﻿using Microsoft.EntityFrameworkCore;
using Tigets.Core.Utilities;
using Tigets.Infrastructure.Data;

namespace Tigets.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add services to the container.
            services.AddControllers();

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddAutoMapper(typeof(DefaultProfile));

            services.AddDbContext<TigetsContext>(options =>
                options.UseSqlServer("Server=ARNASVAIC;Initial Catalog=Tigets;Integrated Security=True;")
            );
        }

        public void Configure(WebApplication app, IWebHostEnvironment env)
        {
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}