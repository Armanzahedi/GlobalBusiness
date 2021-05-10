using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace GlobalBusiness.Core.Entities
{
    public class User : IdentityUser
    {
        public string Avatar { get; set; }
        [MaxLength(300)]
        public string FirstName { get; set; }
        [MaxLength(300)]
        public string LastName { get; set; }
        [MaxLength(20)]
        public string PassportNumber { get; set; }

        public bool  IsDeleted { get; set; }

        public ICollection<ReferralLink> ReferralLinks { get; set; }
        public ICollection<ReferralTree> ReferralTreeAsParent { get; set; }
        public ICollection<ReferralTree> ReferralTreeAsChild { get; set; }
    }
}
