using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GlobalBusiness.DataAccess.Repositories;
using GlobalBusiness.Utilities.Enums;
using Microsoft.AspNetCore.Authorization;

namespace GlobalBusiness.Web.Areas.Management.Controllers
{
    [Area("Management")]
    public class DashboardController : Controller
    {
        private readonly IReferralLinkRepository _referralLinkRepository;

        public DashboardController(IReferralLinkRepository referralLinkRepository)
        {
            _referralLinkRepository = referralLinkRepository;
        }

        [Authorize]
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult MyProfile()
        {
            return View();
        }
        public async Task<ActionResult> MyReferralLink(ReferralType referralType)
        {
            var model = await _referralLinkRepository.GetUserReferralLink(referralType);
            return PartialView(model);
        }
    }
}
