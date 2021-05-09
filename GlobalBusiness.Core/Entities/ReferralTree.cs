using System;
using System.Collections.Generic;
using System.Text;
using GlobalBusiness.Utilities.Enums;

namespace GlobalBusiness.Core.Entities
{
    public class ReferralTree
    {
        public int Id { get; set; }
        public string ParentNodeId { get; set; }
        public User ParentNode { get; set; }

        public string ChildNodeId { get; set; }
        public User ChildNode { get; set; }

        public ReferralType ReferralType { get; set; }
        public DateTime InsertDate { get; set; }
        public bool IsDeleted { get; set; }

    }
}
