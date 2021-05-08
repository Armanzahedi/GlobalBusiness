using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Web.Mvc;

namespace GlobalBusiness.Core.Entities
{
    [Table(name: "AspNetNavigationMenu")]
    public class NavigationMenu
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [ForeignKey("ParentNavigationMenu")]
        public int? ParentMenuId { get; set; }

        public virtual NavigationMenu ParentNavigationMenu { get; set; }
        [AllowHtml]
        public string Icon { get; set; }
        public int? DisplayOrder { get; set; }
        public string ElementIdentifier { get; set; }
        //public string Area { get; set; }

        public string ControllerName { get; set; }

        public string ActionName { get; set; }


        [NotMapped]
        public bool Permitted { get; set; }

        public bool Visible { get; set; }
    }
}
