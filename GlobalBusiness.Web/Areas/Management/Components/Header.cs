using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.Infrastructure.ExtensionMethods;
using GlobalBusiness.Web.Areas.Management.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GlobalBusiness.Web.Areas.Management.Components
{
    public class HeaderViewComponent : ViewComponent
    {
        private readonly UserManager<User> _userManager;

        public HeaderViewComponent(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var model = new HeaderViewModel();
            var user = await _userManager.GetUserAsync(HttpContext.User);
            if (user != null)
            {
                model.UserId = user.Id;
                model.UserInitials = $"{user.FirstName?.ToUpper()[0]}{user.LastName?.ToUpper()[0]}";
                model.UserAvatar = user.GetAvatar();
            }
            return View("/Areas/Management/Views/Shared/Components/Header.cshtml",model);
        }
    }
}
