using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Context;
using Microsoft.AspNetCore.Http;

namespace GlobalBusiness.DataAccess.Repositories
{
    public interface ILogRepository
    {
        Task<Log> LogEvent(string TableName, int id, string Action);
    }
    public class LogsRepository
    {
        private readonly MyDbContext _context;
        private readonly HttpContextAccessor _httpContext;

        public LogsRepository(MyDbContext context, HttpContextAccessor httpContext)
        {
            _context = context;
            _httpContext = httpContext;
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
            if (_httpContext?.HttpContext?.User?.Identity?.Name != null)
            {
                userName = _httpContext.HttpContext.User.Identity.Name;
            }
            return userName;
        }
    }
}
