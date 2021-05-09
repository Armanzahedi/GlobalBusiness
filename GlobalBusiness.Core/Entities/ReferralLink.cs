using System;
using System.Collections.Generic;
using System.Text;
using GlobalBusiness.Utilities.Enums;

namespace GlobalBusiness.Core.Entities
{
    public class ReferralLink 
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string Link { get; set; }
        public ReferralType ReferralType { get; set; }
        public DateTime InsertDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
