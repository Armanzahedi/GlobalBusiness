using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GlobalBusiness.DataAccess.Repositories;
using GlobalBusiness.Infrastructure.Services;
using Microsoft.AspNetCore.Http;

namespace GlobalBusiness.Web.Controllers
{
    public class AuthController : Controller
    {
        private readonly IReferralLinkRepository _referralLinkRepo;
        private readonly IAuthService _authService;

        public AuthController(IReferralLinkRepository referralLinkRepo, IAuthService authService)
        {
            _referralLinkRepo = referralLinkRepo;
            _authService = authService;
        }

        public async Task<IActionResult> Register(string @ref)
        {
            if (string.IsNullOrEmpty(@ref) || _referralLinkRepo.ValidateReferralLink(@ref) == false)
                return StatusCode(StatusCodes.Status404NotFound);

            var model = await _authService.GetRegisterForm(@ref);
            return View(model);
        }
    }
}
