using System;
using System.Collections.Generic;
using System.Text;

namespace GlobalBusiness.Core.Entities
{
    public class UserPackage
    {

        public string UserId { get; set; }
        public User User { get; set; }

        public int PackageId { get; set; }
        public Package Package { get; set; }

        public DateTime CreateTime { get; set; }
        public DateTime ExpireTime { get; set; }

        #region IsPackageValid

        public bool IsValid()
        {
            var start = CreateTime;
            var end = start.AddMonths(Package.Period);
            var now = DateTime.Now;

            return now >= start && now <= end;
        }

        #endregion
    }
}
