using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Repositories;
using GlobalBusiness.Infrastructure.DTOs.Auth;
using GlobalBusiness.Infrastructure.ExtensionMethods;
using GlobalBusiness.Utilities.Enums;
using Microsoft.AspNetCore.Identity;

namespace GlobalBusiness.Infrastructure.Services
{
    public interface IAuthService
    {
        Task<RegisterDto> GetRegisterForm(string referralLink);
        Task<User> GetUserByUsernameOrEmail(string username);
        Task<IdentityResult> RegisterUser(RegisterDto model);
    }
    public class AuthService : IAuthService
    {
        private readonly IReferralLinkService _referralLinkService;
        private readonly IReferralTreeService _referralTreeService;
        private readonly IUserRepository _userRepo;
        private readonly UserManager<User> _userManager;

        public AuthService(IReferralLinkService referralLinkService, IUserRepository userRepo, UserManager<User> userManager, IReferralTreeService referralTreeService)
        {
            _referralLinkService = referralLinkService;
            _userRepo = userRepo;
            _userManager = userManager;
            _referralTreeService = referralTreeService;
        }

        public async Task<RegisterDto> GetRegisterForm(string referralLink)
        {
            var model = new RegisterDto {ReferralLink = referralLink};

            var parentNode = await _userRepo.GetByReferralLink(referralLink);
            if (parentNode != null)
            {
                model.ParentNode.Name = $"{parentNode.FirstName} {parentNode.LastName}";
                model.ParentNode.Image = parentNode.GetAvatar();
            }

            return model;
        }

        public async Task<User> GetUserByUsernameOrEmail(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(username);
            }
            return user;
        }

        public async Task<IdentityResult> RegisterUser(RegisterDto model)
        {
            var username = await GenerateUserName(model.Firstname, model.Lastname);
            var user = new User
            {
                UserName = username,
                FirstName = model.Firstname,
                LastName = model.Lastname,
                Email = model.Email,
                PassportNumber = model.PassportNumber,
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                var addedUser = await _userManager.FindByNameAsync(username);
                var parentReferralLink = await _referralLinkService.GetByLink(model.ReferralLink);

                var referralTree =
                    await _referralTreeService.AddReferralTreeItem(parentReferralLink.UserId, addedUser.Id,
                        parentReferralLink.ReferralType);

                var leftLink = _referralLinkService.CreateUserReferralLink(addedUser.Id, ReferralType.LeftWing);
                var rightLink = _referralLinkService.CreateUserReferralLink(addedUser.Id, ReferralType.RightWing);
            }
            return result;
        }

        private async Task<string> GenerateUserName(string firstname,string lastname)
        {
            var random6Digit= new Random().Next(0, 1000000);
            string random6DigitStr = random6Digit.ToString("000000");
            var userInitials = firstname.ToLower()[0] + lastname.ToLower()[0];
            var username = userInitials + random6DigitStr;
            var user = await  _userManager.FindByNameAsync(username);
            if (user != null)
                await GenerateUserName(firstname,lastname);

            return username;
        }
    }
}
