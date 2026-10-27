using System.Web.Mvc;

namespace CollegeCommunity.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "About College Community.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Contact College Community.";

            return View();
        }
    }
}