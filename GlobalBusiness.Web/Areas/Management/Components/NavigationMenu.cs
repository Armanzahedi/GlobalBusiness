using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GlobalBusiness.Web.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace GlobalBusiness.Web.Areas.Management.Components
{
	public class NavigationMenuViewComponent : ViewComponent
	{
		private readonly IRolePermissionService _rolePermissionService;

		public NavigationMenuViewComponent(IRolePermissionService rolePermissionService)
		{
			_rolePermissionService = rolePermissionService;
		}

		public async Task<IViewComponentResult> InvokeAsync()
		{
			var items = await _rolePermissionService.GetMenuItemsAsync(HttpContext.User);

			return View("/Areas/Management/Views/Shared/Components/NavigationMenu.cshtml",items);
		}
	}
}
