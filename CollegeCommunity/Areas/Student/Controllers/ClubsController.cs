using System;
using System.Linq;
using System.Web.Mvc;
using CollegeCommunity.Data;
using CollegeCommunity.Models;

namespace CollegeCommunity.Areas.Student.Controllers
{
    public class ClubsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Index()
        {
            if (Session["UserId"] == null) return RedirectToAction("Login", "Account", new { area = "" });

            int studentId = (int)Session["UserId"];

            // Get all clubs to display
            var allClubs = db.Clubs.OrderBy(c => c.Name).ToList();

            // Get a list of Club IDs this student has joined
            var joinedClubIds = db.ClubMemberships
                .Where(cm => cm.StudentId == studentId)
                .Select(cm => cm.ClubId)
                .ToList();

            ViewBag.JoinedClubIds = joinedClubIds;
            return View(allClubs);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Join(int id)
        {
            if (Session["UserId"] == null) return RedirectToAction("Login", "Account", new { area = "" });
            int studentId = (int)Session["UserId"];

            // Ensure they aren't already a member before adding
            if (!db.ClubMemberships.Any(cm => cm.StudentId == studentId && cm.ClubId == id))
            {
                db.ClubMemberships.Add(new ClubMembership
                {
                    StudentId = studentId,
                    ClubId = id,
                    JoinedAt = DateTime.Now
                });
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Leave(int id)
        {
            if (Session["UserId"] == null) return RedirectToAction("Login", "Account", new { area = "" });
            int studentId = (int)Session["UserId"];

            var membership = db.ClubMemberships.FirstOrDefault(cm => cm.StudentId == studentId && cm.ClubId == id);
            if (membership != null)
            {
                db.ClubMemberships.Remove(membership);
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing) { if (disposing) db.Dispose(); base.Dispose(disposing); }
    }
}