using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using GlobalBusiness.DataAccess.Repositories;
using GlobalBusiness.Infrastructure.DTOs.Auth;
using GlobalBusiness.Infrastructure.ExtensionMethods;

namespace GlobalBusiness.Infrastructure.Services
{
    public interface IAuthService
    {
        Task<RegisterDto> GetRegisterForm(string referralLink);
    }
    public class AuthService : IAuthService
    {
        private readonly IReferralLinkRepository _referralLinkRepo;
        private readonly IUserRepository _userRepo;

        public AuthService(IReferralLinkRepository referralLinkRepo, IUserRepository userRepo)
        {
            _referralLinkRepo = referralLinkRepo;
            _userRepo = userRepo;
        }

        public async Task<RegisterDto> GetRegisterForm(string referralLink)
        {
            var model = new RegisterDto();
            model.ReferralLink = referralLink;

            var parentNode = await _userRepo.GetByReferralLink(referralLink);
            if (parentNode != null)
            {
                model.ParentNode.Name = $"{parentNode.FirstName} {parentNode.LastName}";
                model.ParentNode.Image = parentNode.GetAvatar();
            }

            return model;
        }
    }
}
