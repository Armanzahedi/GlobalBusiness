using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;
using Microsoft.AspNetCore.Mvc;

namespace GlobalBusiness.Infrastructure.ExtensionMethods
{
    public static class HttpExtensionMethods
    {
        public static string AbsoluteAction(
            this IUrlHelper url,
            string actionName,
            string controllerName,
            object routeValues = null)
        {
            string scheme = url.ActionContext.HttpContext.Request.Scheme;
            return url.Action(actionName, controllerName, routeValues, scheme);
        }
    }
}
