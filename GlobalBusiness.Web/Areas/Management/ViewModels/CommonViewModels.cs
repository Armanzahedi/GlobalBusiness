using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GlobalBusiness.Web.Areas.Management.ViewModels
{
    public class HeaderViewModel
    {
        public string UserId { get; set; }
        public string UserInitials { get; set; }
        public string UserAvatar { get; set; }
    }
    public class NavigationMenuViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int? ParentMenuId { get; set; }
        public string Icon { get; set; }
        public string ElementIdentifier { get; set; }

        public string ControllerName { get; set; }

        public string ActionName { get; set; }

        public bool Permitted { get; set; }

        public int? DisplayOrder { get; set; }

        public bool Visible { get; set; }
    }
}
