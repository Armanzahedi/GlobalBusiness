using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GlobalBusiness.Core.Entities
{
    public class Package : IBaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal FromPrice { get; set; }
        public decimal ToPrice { get; set; }
        public byte Period { get; set; }
        public double TotalProfit { get; set; }
        public double ReferralIncome { get; set; }
        public double BinaryIncome { get; set; }
        public decimal CappingMonthlyLimit { get; set; }
        public double AvgProfitMonth { get; set; }
        [MaxLength(500)]
        public string Description { get; set; }
        public DateTime InsertDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string InsertUser { get; set; }
        public string UpdateUser { get; set; }
        public bool IsDeleted { get; set; }
    }

}
