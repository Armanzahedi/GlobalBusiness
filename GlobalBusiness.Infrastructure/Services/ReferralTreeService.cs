using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Context;
using GlobalBusiness.Utilities.Enums;
using Microsoft.EntityFrameworkCore;

namespace GlobalBusiness.Infrastructure.Services
{
    public interface IReferralTreeService
    {
        Task<ReferralTree> AddReferralTreeItem(string parent, string child, ReferralType refType);
        Task<ReferralTree> DeleteReferralTreeItem(int refId);
        Task<List<ReferralTree>> GetUserReferralTree(string userId);
    }
    public class ReferralTreeService : IReferralTreeService
    {
        private readonly MyDbContext _context;

        public ReferralTreeService(MyDbContext context)
        {
            _context = context;
        }

        public async Task<ReferralTree> AddReferralTreeItem(string parent, string child, ReferralType refType)
        {
            var model = new ReferralTree
            {
                ParentNodeId = parent,
                ChildNodeId = child,
                ReferralType =  refType
            };
            _context.ReferralTree.Add(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<ReferralTree> DeleteReferralTreeItem(int refId)
        {
            var item = await _context.ReferralTree.FindAsync(refId);
            item.IsDeleted = true;
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<List<ReferralTree>> GetUserReferralTree(string userId)
        {
            return await _context.ReferralTree
                .Where(r => (r.ParentNodeId == userId || r.ChildNodeId == userId) && r.IsDeleted == false).ToListAsync();
        }
    }
}
