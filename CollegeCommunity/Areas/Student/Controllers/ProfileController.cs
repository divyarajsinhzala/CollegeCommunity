using System.Linq;
using System.Web.Mvc;
using CollegeCommunity.Data;
using CollegeCommunity.Models;

namespace CollegeCommunity.Areas.Student.Controllers
{
    public class ProfileController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Student/Profile
        public ActionResult Index()
        {
            // Security check
            if (Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Account", new { area = "" });
            }

            int userId = (int)Session["UserId"];

            // Fetch live user data from Database
            var student = db.Students.FirstOrDefault(s => s.Id == userId);

            if (student == null)
            {
                return HttpNotFound();
            }

            return View(student);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}