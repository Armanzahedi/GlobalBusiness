using System;
using System.Collections.Generic;
using System.Text;
using GlobalBusiness.DataAccess.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace GlobalBusiness.DataAccess
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDataAccess(this IServiceCollection services)
        {
            #region Add Repositories
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IUserRepository, UserRepository>();
            //services.AddScoped<IReferralLinkRepository, ReferralLinkRepository>();
            services.AddScoped<ILogRepository, LogRepository>();

            #endregion

            return services;
        }
    }
}
