using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Context;
using GlobalBusiness.DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GlobalBusiness.Infrastructure.Services
{
    public interface IUserService
    {
        Task RemoveUserIfWithoutPackage(string userId);
        Task<bool> ValidateUserHasActivePackage(string userId);
    }
    public class UserService : IUserService
    {
        private readonly MyDbContext _context;
        private readonly IReferralLinkService _referralLinkService;
        private readonly IReferralTreeService _referralTreeService;
        private readonly UserManager<User> _userManager;

        public UserService(MyDbContext context, UserManager<User> userManager, IReferralLinkService referralLinkService, IReferralTreeService referralTreeService)
        {
            _context = context;
            _userManager = userManager;
            _referralLinkService = referralLinkService;
            _referralTreeService = referralTreeService;
        }

        public async Task RemoveUserIfWithoutPackage(string userId)
        {
            if (await ValidateUserHasActivePackage(userId) == false)
            {
                var user = await _userManager.FindByIdAsync(userId);
                user.IsDeleted = true;
                await _userManager.UpdateAsync(user);
                var userRefLinks = await _referralLinkService.GetUserReferralLinks(userId);
                foreach (var refLink in userRefLinks)
                {
                    await _referralLinkService.Delete(refLink.Id);
                }

                var referralTree = await _referralTreeService.GetUserReferralTree(userId);
                foreach (var item in referralTree)
                {
                    await _referralTreeService.DeleteReferralTreeItem(item.Id);
                }
            }
        }

        public async Task<bool> ValidateUserHasActivePackage(string userId)
        {
            return await _context.UserPackages.AnyAsync(up => up.UserId == userId && up.IsValid());
        }
    }
}
