using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GlobalBusiness.Web.Areas.Identity.Pages.Account
{
    public class AccessDeniedModel : PageModel
    {
        public void OnGet(string ReturnUrl = "/Management/Dashboard")
        {
            ViewData["ReturnUrl"] = "/Management/Dashboard";
        }
    }
}

