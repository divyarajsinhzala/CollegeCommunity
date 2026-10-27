using System;
using System.Linq;
using System.Web.Mvc;
using CollegeCommunity.Data;
using CollegeCommunity.Models;

namespace CollegeCommunity.Areas.Admin.Controllers
{
    public class ManageChatController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Index(int? clubId)
        {
            ViewBag.Clubs = db.Clubs.OrderBy(c => c.Name).ToList();
            ViewBag.ActiveClubId = clubId;

            if (clubId == null) return View(new System.Collections.Generic.List<ChatMessage>());

            var messages = db.ChatMessages
                .Where(m => m.ClubId == clubId)
                .OrderByDescending(m => m.Timestamp)
                .Take(50)
                .ToList();

            messages.Reverse();
            return View(messages);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SendMessage(int clubId, string messageText)
        {
            if (!string.IsNullOrWhiteSpace(messageText))
            {
                var adminName = Session["AdminName"]?.ToString() ?? "Administrator";

                var msg = new ChatMessage
                {
                    ClubId = clubId,
                    SenderName = adminName,
                    SenderEnrollmentNo = "ADMIN",
                    MessageText = messageText.Trim(),
                    Timestamp = DateTime.Now,
                    IsAdmin = true,
                    IsPrivate = false,
                    IsHidden = false,
                    IsWarning = false
                };

                db.ChatMessages.Add(msg);
                db.SaveChanges();
            }
            return RedirectToAction("Index", new { clubId = clubId });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, int clubId)
        {
            var msg = db.ChatMessages.Find(id);
            if (msg != null) { db.ChatMessages.Remove(msg); db.SaveChanges(); }
            return RedirectToAction("Index", new { clubId = clubId });
        }

        protected override void Dispose(bool disposing) { if (disposing) db.Dispose(); base.Dispose(disposing); }
    }
}