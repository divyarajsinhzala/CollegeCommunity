using System.Linq;
using System.Web.Mvc;
using CollegeCommunity.Data;

namespace CollegeCommunity.Areas.Student.Controllers
{
    public class AnnouncementsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Index()
        {
            if (Session["UserId"] == null) return RedirectToAction("Login", "Account", new { area = "" });

            // Fetch all announcements ordered by the latest date
            var announcements = db.Announcements.OrderByDescending(a => a.DatePosted).ToList();
            return View(announcements);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}