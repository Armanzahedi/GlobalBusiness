using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Context;
using GlobalBusiness.DataAccess.Repositories;
using GlobalBusiness.Utilities.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GlobalBusiness.Infrastructure.Services
{
    public interface IReferralLinkService
    {
        string GenerateReferralLink();
        Task<ReferralLink> GetUserReferralLink(ReferralType referralType);
        Task<List<ReferralLink>> GetUserReferralLinks(string userId);
        Task<ReferralLink> GetUserReferralLink(string userId, ReferralType referralType);
        ReferralLink CreateUserReferralLink(ReferralType referralType);
        ReferralLink CreateUserReferralLink(string userId, ReferralType referralType);
        bool ValidateReferralLink(string referralLink);
        Task<ReferralLink> GetByLink(string link);
        Task<ReferralLink> Delete(int id);
    }
    public class ReferralLinkService : IReferralLinkService
    {
        private readonly MyDbContext _context;
        private readonly UserManager<User> _userManager;


        public ReferralLinkService(MyDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public string GenerateReferralLink()
        {
            var uniqueLink = Guid.NewGuid().ToString().Substring(0, 6);

            if (CheckLinkUniqueness(uniqueLink) == false)
                GenerateReferralLink();

            return uniqueLink;
        }

        public async Task<ReferralLink> GetUserReferralLink(ReferralType referralType)
        {
            var userId = _userManager.GetUserId(Core.Helpers.AppContext.Current.User);
            return await GetUserReferralLink(userId, referralType);
        }

        public async Task<List<ReferralLink>> GetUserReferralLinks(string userId)
        {
            return await _context.ReferralLinks.Where(l => l.UserId == userId).ToListAsync();
        }

        public async Task<ReferralLink> GetUserReferralLink(string userId, ReferralType referralType)
        {
            return await _context.ReferralLinks.FirstOrDefaultAsync(l => l.UserId == userId && l.ReferralType == referralType);
        }

        public ReferralLink CreateUserReferralLink(ReferralType referralType)
        {
            var userId = _userManager.GetUserId(Core.Helpers.AppContext.Current.User);
            return CreateUserReferralLink(userId, referralType);
        }

        public ReferralLink CreateUserReferralLink(string userId, ReferralType referralType)
        {
            var model = new ReferralLink
            {
                UserId = userId,
                ReferralType = referralType,
                Link = GenerateReferralLink(),
                InsertDate = DateTime.Now,
            };
            _context.ReferralLinks.Add(model);
            _context.SaveChanges();
            return model;
        }

        public bool ValidateReferralLink(string referralLink)
        {
            return _context.ReferralLinks.Any(l => l.Link == referralLink && l.IsDeleted == false && l.User.LockoutEnabled == false && l.User.IsDeleted == false);
        }

        public async Task<ReferralLink> GetByLink(string link)
        {
            return await _context.ReferralLinks.FirstOrDefaultAsync(l => l.Link == link);
        }

        public async Task<ReferralLink> Delete(int id)
        {
            var refLink  = await _context.ReferralLinks.FindAsync(id);
            refLink.IsDeleted = true;
            _context.Entry(refLink).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return refLink;
        }

        private bool CheckLinkUniqueness(string link)
        {
            return !_context.ReferralLinks.Any(l => l.Link == link);
        }
    }
}
