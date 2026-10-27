using System.Linq;
using System.Web.Mvc;
using CollegeCommunity.Data;
using System.Data.Entity;

namespace CollegeCommunity.Areas.Admin.Controllers
{
    public class ManageFeedbackController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Index()
        {
            var feedback = db.Feedbacks.Include(f => f.Student).OrderByDescending(f => f.SubmittedAt).ToList();
            return View(feedback);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ToggleResolve(int id)
        {
            var ticket = db.Feedbacks.Find(id);
            if (ticket != null)
            {
                ticket.IsResolved = !ticket.IsResolved;
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            var ticket = db.Feedbacks.Find(id);
            if (ticket != null)
            {
                db.Feedbacks.Remove(ticket);
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing) { if (disposing) db.Dispose(); base.Dispose(disposing); }
    }
}