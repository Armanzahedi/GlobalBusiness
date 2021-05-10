using System;
using System.Collections.Generic;
using System.Text;
using GlobalBusiness.DataAccess.Repositories;
using GlobalBusiness.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace GlobalBusiness.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            #region Add Services
            services.AddScoped<IAuthService, AuthService>();
            #endregion

            return services;
        }
    }
}
