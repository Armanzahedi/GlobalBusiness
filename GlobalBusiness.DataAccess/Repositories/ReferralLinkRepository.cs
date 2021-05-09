using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Context;
using GlobalBusiness.Utilities.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GlobalBusiness.DataAccess.Repositories
{
    public interface IReferralLinkRepository
    {
        string GenerateReferralLink();
        Task<ReferralLink> GetUserReferralLink(ReferralType referralType);
        Task<ReferralLink> GetUserReferralLink(string userId, ReferralType referralType);
        ReferralLink CreateUserReferralLink(ReferralType referralType);
        ReferralLink CreateUserReferralLink(string userId, ReferralType referralType);
    }
    public class ReferralLinkRepository : IReferralLinkRepository
    {
        private readonly MyDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly HttpContextAccessor _httpContext;


        public ReferralLinkRepository(MyDbContext context, UserManager<User> userManager, HttpContextAccessor httpContext)
        {
            _context = context;
            _userManager = userManager;
            _httpContext = httpContext;
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
            var userId = _userManager.GetUserId(_httpContext.HttpContext.User);
            return await GetUserReferralLink(userId, referralType);
        }

        public async Task<ReferralLink> GetUserReferralLink(string userId, ReferralType referralType)
        {
           return await _context.ReferralLinks.FirstOrDefaultAsync(l => l.UserId == userId && l.ReferralType == referralType);
        }

        public ReferralLink CreateUserReferralLink(ReferralType referralType)
        {
            var userId = _userManager.GetUserId(_httpContext.HttpContext.User);
            return CreateUserReferralLink(userId,referralType);
        }

        public ReferralLink CreateUserReferralLink(string userId,ReferralType referralType)
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

        private bool CheckLinkUniqueness(string link)
        {
            return !_context.ReferralLinks.Any(l => l.Link == link);
        }
    }
}
