using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GlobalBusiness.Web.Controllers
{
    public class ErrorController : Controller
    {
        //[Route("Error/{code}")]
        //public IActionResult Error404()
        //{
        //    return View();
        //}
        [Route("Error/{code:int}")]
        public IActionResult Error(int code)
        {
            ViewBag.ErrorCode = code;
            return View();
        }
    }
}
