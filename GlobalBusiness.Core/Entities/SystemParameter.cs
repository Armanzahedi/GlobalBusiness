using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GlobalBusiness.Core.Entities
{
    [Table("SystemParameters")]
   public class SystemParameter : IBaseEntity
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "شاخص")]
        public string Key { get; set; }
        [Display(Name = "مقدار")]
        public string Value { get; set; }
        [Display(Name = "توضیحات")]
        public string Description { get; set; }
        public DateTime InsertDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        [MaxLength(100)]
        public string InsertUser { get; set; }
        [MaxLength(100)]
        public string UpdateUser { get; set; }

        public bool IsDeleted { get; set; }
    }
}
