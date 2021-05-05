using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess;
using GlobalBusiness.DataAccess.Context;

namespace GlobalBusiness.Web.Helpers
{
    public interface IUserPermissionHelper
    {
        Task<bool> UserHasPermission(string controller, string action);
    }
    public  class UserPermissionHelper : IUserPermissionHelper
    {
        private readonly MyDbContext _dbContext;
        private readonly UserManager<User> _userManager;

        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserPermissionHelper(MyDbContext dbContext, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }
        public async Task<bool> UserHasPermission(string controller, string action)
        {
            var user = _httpContextAccessor.HttpContext.User;

            if (!user.Identity.IsAuthenticated)
            {
                return false;
            }
            var usr = await _userManager.GetUserAsync(user);
            var userRoles = _dbContext.UserRoles.Where(ur => ur.UserId == usr.Id).Select(ur => ur.RoleId).ToList();
            var userHasPermission = _dbContext.RoleMenuPermission
                .Any(rp => userRoles.Any(ur => ur == rp.RoleId)
                && rp.NavigationMenu.ControllerName.Trim().ToLower().Equals(controller)
                && rp.NavigationMenu.ActionName.Trim().ToLower().Equals(action));

            if (userHasPermission == false)
                return false;

            return true;
        }
    }
}
