using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CollegeCommunity.Data;

namespace CollegeCommunity.Areas.Student.Controllers
{
    public class NotificationsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Index()
        {
            var studentName = Session["UserName"]?.ToString();
            if (studentName == null) return RedirectToAction("Login", "Account", new { area = "" });

            // Get the last read timestamp from the cookie
            DateTime lastReadTime = DateTime.MinValue;
            if (Request.Cookies["LastReadCookie"] != null)
            {
                DateTime.TryParse(Request.Cookies["LastReadCookie"].Value, out lastReadTime);
            }
            ViewBag.LastReadTime = lastReadTime;

            var urgentAlerts = db.Announcements
                .Where(a => a.Type == "red" || a.Type == "urgent")
                .OrderByDescending(a => a.DatePosted)
                .ToList();

            var mentions = db.ChatMessages
                .Where(m => !m.IsHidden && (m.TargetUser == studentName || m.TargetUser == "all" || m.MessageText.Contains("@" + studentName) || m.MessageText.Contains("@all")))
                .OrderByDescending(m => m.Timestamp)
                .ToList();

            ViewBag.UrgentAlerts = urgentAlerts;
            ViewBag.Mentions = mentions;

            return View();
        }

        [HttpPost]
        public ActionResult MarkAllAsRead()
        {
            // Save the exact current time to a persistent cookie that survives restarts
            var cookie = new HttpCookie("LastReadCookie", DateTime.Now.ToString("O"));
            cookie.Expires = DateTime.Now.AddYears(1);
            Response.Cookies.Add(cookie);

            return Json(new { success = true });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}