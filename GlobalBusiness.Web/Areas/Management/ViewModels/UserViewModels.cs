using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GlobalBusiness.Web.Areas.Management.ViewModels
{
    public class UserInfoViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
    }
    public class RoleViewModel
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }

        public bool Selected { get; set; }
    }
}
