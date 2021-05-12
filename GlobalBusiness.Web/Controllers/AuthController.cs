using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Repositories;
using GlobalBusiness.Infrastructure.DTOs.Auth;
using GlobalBusiness.Infrastructure.Services;
using GlobalBusiness.Web.Areas.Identity.Pages.Account;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;

namespace GlobalBusiness.Web.Controllers
{
    public class AuthController : Controller
    {
        private readonly IReferralLinkService _referralLinkService;
        private readonly IAuthService _authService;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IEmailSender _emailSender;

        public AuthController(IReferralLinkService referralLinkService, IAuthService authService, SignInManager<User> signInManager, UserManager<User> userManager, ILogger<RegisterModel> logger, IEmailSender emailSender)
        {
            _referralLinkService = referralLinkService;
            _authService = authService;
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
            _emailSender = emailSender;
        }

        public async Task<IActionResult> Register(string @ref)
        {
            if (string.IsNullOrEmpty(@ref) || _referralLinkService.ValidateReferralLink(@ref) == false)
                return NotFound();

            var model = await _authService.GetRegisterForm(@ref);
            return View(model);
        }
        [HttpPost]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            if (ModelState.IsValid)
            {
                var returnUrl = Url.Action("Index", "Dashboard", new {area = "Management"});
                var user = new User { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");

                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

                    var callbackUrl = Url.Action("ConfirmEmail", "Auth", new {userId = user.Id, code = code, returnUrl = returnUrl }, Request.Scheme);

                    await _emailSender.SendEmailAsync(model.Email, "Confirm your email",
                        $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                    if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    {
                        return RedirectToAction("RegisterConfirmation", new { email = model.Email, returnUrl = returnUrl });
                    }
                    else
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return LocalRedirect(returnUrl);
                    }
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }
            var registerModel = await _authService.GetRegisterForm(model.ReferralLink);
            return View(registerModel);
        }

        public async Task<IActionResult> Login(string returnUrl = null)
        {

            returnUrl ??= Url.Action("Index","Dashboard", new {area="Management"});

            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            var model =  new LoginDto{ReturnUrl = returnUrl};

            return View(model);
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginDto model)
        {
            model.ReturnUrl ??= Url.Action("Index", "Dashboard", new {area = "Management"});

            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var user = await _authService.GetUserByUsernameOrEmail(model.Username);
                var result = await _signInManager.PasswordSignInAsync(user?.UserName, model.Password, model.RememberMe, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    _logger.LogInformation("User logged in.");
                    return LocalRedirect(model.ReturnUrl);
                }
                if (result.RequiresTwoFactor)
                {
                    return RedirectToPage("./LoginWith2fa", new { ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
                }
                if (result.IsLockedOut)
                {
                    _logger.LogWarning("User account locked out.");
                    return RedirectToPage("./Lockout");
                }
                if (result.IsNotAllowed)
                {
                    ModelState.AddModelError(string.Empty, $"In order to activate your account you need to confirm your email first.");
                    ViewBag.IsNotAllowed = true;
                    ViewBag.Username = user.UserName;
                    return View();
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Entered credentials are incorrect");
                    return View();
                }
            }

            return View();
        }
        public async Task<IActionResult> RegisterConfirmation(string email, string returnUrl = null)
        {
            if (email == null)
            {
                return RedirectToAction("Index","Home");
            }

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound($"Unable to load user with email '{email}'.");
            }

            return View();
        }
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {

            if (userId == null || code == null)
            {
                return RedirectToAction("Index","Home");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{userId}'.");
            }

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ConfirmEmailAsync(user, code);
            ViewBag.StatusMessage = result.Succeeded ? "Thank you for confirming your email." : "Error confirming your email.";
            return View();
        }
        public async Task<IActionResult> SendConfirmationEmail(string username, string returnUrl = null)
        {
            returnUrl ??= Url.Action("Index", "Dashboard", new { area = "Management" });

            var user = await _authService.GetUserByUsernameOrEmail(username);

            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            var callbackUrl = Url.Action("ConfirmEmail", "Auth", new { userId = user.Id, code = code, returnUrl = returnUrl }, Request.Scheme);

            await _emailSender.SendEmailAsync(user.Email, "Confirm your email",
                $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

            return RedirectToAction("RegisterConfirmation","Auth",new {email = user.Email});
        }
    }
}
