using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using CollegeCommunity.Data;

namespace CollegeCommunity.Areas.Admin.Controllers
{
    public class DashboardController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Index()
        {
            if (Session["AdminName"] == null) return RedirectToAction("Login", "Account", new { area = "" });

            ViewBag.TotalStudents = db.Students.Count(s => !s.IsAdmin);
            ViewBag.TotalEvents = db.Events.Count();
            ViewBag.TotalAnnouncements = db.Announcements.Count();
            ViewBag.TotalClubs = db.Clubs.Count();

            ViewBag.RecentEvents = db.Events.OrderByDescending(e => e.EventDate).Take(4).ToList();
            ViewBag.RecentAnnouncements = db.Announcements.OrderByDescending(a => a.DatePosted).Take(4).ToList();

            ViewBag.CurrentAdmins = db.Students.Where(s => s.IsAdmin).ToList();

            // Calculate how many students joined each club for the Dashboard card
            var clubStats = new Dictionary<string, int>();
            var allClubs = db.Clubs.ToList();
            foreach (var club in allClubs)
            {
                int memberCount = db.ClubMemberships.Count(cm => cm.ClubId == club.Id);
                clubStats.Add(club.Name, memberCount);
            }
            ViewBag.ClubStats = clubStats;

            return View();
        }

        public ActionResult Settings()
        {
            if (Session["AdminName"] == null) return RedirectToAction("Login", "Account", new { area = "" });

            ViewBag.MaintenanceMode = HttpContext.Application["MaintenanceMode"] as bool? ?? false;
            ViewBag.GlobalChatLock = HttpContext.Application["GlobalChatLock"] as bool? ?? false;

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ToggleMaintenance()
        {
            bool current = HttpContext.Application["MaintenanceMode"] as bool? ?? false;
            HttpContext.Application["MaintenanceMode"] = !current;
            return RedirectToAction("Settings");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ToggleChatLock()
        {
            bool current = HttpContext.Application["GlobalChatLock"] as bool? ?? false;
            HttpContext.Application["GlobalChatLock"] = !current;
            return RedirectToAction("Settings");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ClearOldChats()
        {
            if (Session["AdminName"] == null) return RedirectToAction("Login", "Account", new { area = "" });

            // Deletes chat messages older than 30 days
            var thirtyDaysAgo = System.DateTime.Now.AddDays(-30);
            var oldChats = db.ChatMessages.Where(m => m.Timestamp < thirtyDaysAgo).ToList();

            int count = oldChats.Count;
            if (count > 0)
            {
                db.ChatMessages.RemoveRange(oldChats);
                db.SaveChanges();
            }

            TempData["SettingsMessage"] = $"Success: {count} old chat messages purged from the database.";
            return RedirectToAction("Settings");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}