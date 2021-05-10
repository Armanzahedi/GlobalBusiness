using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Context;
using Microsoft.AspNetCore.Http;
using AppContext = GlobalBusiness.Core.Helpers.AppContext;

namespace GlobalBusiness.DataAccess.Repositories
{
    public interface ILogRepository
    {
        Task<Log> LogEvent(string TableName, int id, string Action);
    }
    public class LogRepository : ILogRepository
    {
        private readonly MyDbContext _context;

        public LogRepository(MyDbContext context)
        {
            _context = context;
        }
        public async Task<Log> LogEvent(string TableName, int id, string Action)
        {
            var userName = GetCurrentUsersName();
            var log = new Log();
            log.Action = Action;
            log.TableName = TableName;
            log.EntityId = id;
            log.UserName = userName;
            log.ActionDate = DateTime.Now;
            _context.Logs.Add(log);
            await _context.SaveChangesAsync();
            return log;
        }
        private string GetCurrentUsersName()
        {
            var userName = "";
            if (AppContext.Current?.User?.Identity?.Name != null)
            {
                userName = AppContext.Current.User.Identity.Name;
            }
            return userName;
        }
    }
}
