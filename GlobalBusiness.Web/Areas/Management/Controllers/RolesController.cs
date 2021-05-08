using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataTablesParser;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.Web.Areas.Management.ViewModels;
using GlobalBusiness.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace GlobalBusiness.Web.Areas.Management.Controllers
{

    [Area("Management")]
    [Authorize("Permission")]
    public class RolesController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IRolePermissionService _rolePermissionService;
        private readonly ILogger<RolesController> _logger;

        public RolesController(
                UserManager<User> userManager,
                RoleManager<IdentityRole> roleManager,
                IRolePermissionService rolePermissionService,
                ILogger<RolesController> logger)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _rolePermissionService = rolePermissionService;
            _logger = logger;
        }

        //[Authorize("Permission")]
        public IActionResult Index(bool root = false)
        {
            ViewBag.Root = root;
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public string LoadGrid()
        {
            var roles = _roleManager.Roles.Select(item =>
                            new RoleViewModel()
                            {
                                Id = item.Id,
                                Name = item.Name,
                            }
                            );
            var form = Request.Form;
            var parser = new Parser<RoleViewModel>(Request.Form, roles);
            return JsonConvert.SerializeObject(parser.Parse());
        }
        //[Authorize("Roles")]
        public IActionResult Create()
        {
            return PartialView(new RoleViewModel());
        }

        [HttpPost]
        //[Authorize("Roles")]
        public async Task<IActionResult> Create(RoleViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var result = await _roleManager.CreateAsync(new IdentityRole() { Name = viewModel.Name });
                if (result.Succeeded)
                {
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    ModelState.AddModelError("Name", string.Join(",", result.Errors));
                }
            }

            return View(viewModel);
        }
        public async Task<IActionResult> Edit(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            var vm = new RoleViewModel
            {
                Id = role.Id,
                Name = role.Name
            };
            return PartialView(vm);
        }

        [HttpPost]
        //[Authorize("Roles")]
        public async Task<IActionResult> Edit(RoleViewModel vm)
        {
            if (ModelState.IsValid)
            {
                var role = await _roleManager.FindByIdAsync(vm.Id);
                role.Name = vm.Name;
                var result = await _roleManager.UpdateAsync(role);
                if (result.Succeeded)
                {
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    ModelState.AddModelError("Name", string.Join(",", result.Errors));
                }
            }

            return View(vm);
        }
        public async Task<IActionResult> Delete(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            return PartialView(role);
        }
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            var result = await _roleManager.DeleteAsync(role);

            return RedirectToAction(nameof(Index));
        }
        //[Authorize("Authorization")]
        //public async Task<IActionResult> Users()
        //{
        //    var userViewModel = new List<UserViewModel>();

        //    try
        //    {
        //        var users = await _userManager.Users.ToListAsync();
        //        foreach (var item in users)
        //        {
        //            userViewModel.Add(new UserViewModel()
        //            {
        //                Id = item.Id,
        //                Email = item.Email,
        //                UserName = item.UserName,
        //            });
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger?.LogError(ex, ex.GetBaseException().Message);
        //    }

        //    return View(userViewModel);
        //}

        ////[Authorize("Users")]
        //public async Task<IActionResult> EditUser(string id)
        //{
        //    var viewModel = new UserViewModel();
        //    if (!string.IsNullOrWhiteSpace(id))
        //    {
        //        var user = await _userManager.FindByIdAsync(id);
        //        var userRoles = await _userManager.GetRolesAsync(user);

        //        viewModel.Email = user?.Email;
        //        viewModel.UserName = user?.UserName;

        //        var allRoles = await _roleManager.Roles.ToListAsync();
        //        viewModel.Roles = allRoles.Select(x => new RoleViewModel()
        //        {
        //            Id = x.Id,
        //            Name = x.Name,
        //            Selected = userRoles.Contains(x.Name)
        //        }).ToArray();

        //    }

        //    return View(viewModel);
        //}

        //[HttpPost]
        ////[Authorize("Users")]
        //public async Task<IActionResult> EditUser(UserViewModel viewModel)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var user = await _userManager.FindByIdAsync(viewModel.Id);
        //        var userRoles = await _userManager.GetRolesAsync(user);

        //        await _userManager.RemoveFromRolesAsync(user, userRoles);
        //        await _userManager.AddToRolesAsync(user, viewModel.Roles.Where(x => x.Selected).Select(x => x.Name));

        //        return RedirectToAction(nameof(Users));
        //    }

        //    return View(viewModel);
        //}

        public async Task<IActionResult> EditRolePermission(string id)
        {
            var permissions = new List<NavigationMenuViewModel>();
            if (!string.IsNullOrWhiteSpace(id))
            {
                permissions = await _rolePermissionService.GetPermissionsByRoleIdAsync(id);
            }
            var role = await _roleManager.FindByIdAsync(id);
            ViewBag.RoleName = role.Name;
            return View(permissions);
        }

        [HttpPost]
        public async Task<IActionResult> EditRolePermission(string id, List<NavigationMenuViewModel> viewModel)
        {
            if (ModelState.IsValid)
            {
                var permissionIds = viewModel.Where(x => x.Permitted).Select(x => x.Id);

                await _rolePermissionService.SetPermissionsByRoleIdAsync(id, permissionIds);
                return RedirectToAction(nameof(Index));
            }
            var role = await _roleManager.FindByIdAsync(id);
            ViewBag.RoleName = role.Name;
            return View(viewModel);
        }
    }

}
