using Dolphin.Common.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Dolphin.BLL.Repository;
using Dolphin.Common.Data;


namespace Dolphin.Helper
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddDIServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationManagerContext>(options =>
            {
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ITaskRepository, TaskRespository>();

            return services;
        }
    }
}
