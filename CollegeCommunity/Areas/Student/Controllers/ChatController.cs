using System;
using System.Linq;
using System.Web.Mvc;
using CollegeCommunity.Data;
using CollegeCommunity.Models;

namespace CollegeCommunity.Areas.Student.Controllers
{
    public class ChatController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Index(int? clubId)
        {
            if (Session["UserId"] == null) return RedirectToAction("Login", "Account", new { area = "" });
            int studentId = (int)Session["UserId"];

            // Find which clubs the student is a member of
            var joinedClubIds = db.ClubMemberships.Where(cm => cm.StudentId == studentId).Select(cm => cm.ClubId).ToList();

            // Only populate the sidebar with joined clubs
            ViewBag.Clubs = db.Clubs.Where(c => joinedClubIds.Contains(c.Id)).OrderBy(c => c.Name).ToList();

            // Boot the student out if they try to manually navigate to a club they haven't joined via URL
            if (clubId != null && !joinedClubIds.Contains(clubId.Value))
            {
                return RedirectToAction("Index", "Clubs");
            }

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
            if (Session["UserId"] == null) return RedirectToAction("Login", "Account", new { area = "" });
            int studentId = (int)Session["UserId"];

            // Security Check: Must be a member to send a message
            if (!db.ClubMemberships.Any(cm => cm.StudentId == studentId && cm.ClubId == clubId))
            {
                return RedirectToAction("Index", "Clubs");
            }

            if (!string.IsNullOrWhiteSpace(messageText))
            {
                var student = db.Students.Find(studentId);
                if (student != null)
                {
                    var msg = new ChatMessage
                    {
                        ClubId = clubId,
                        SenderName = student.FirstName + " " + student.LastName,
                        SenderEnrollmentNo = student.EnrollmentNo,
                        MessageText = messageText.Trim(),
                        Timestamp = DateTime.Now,
                        IsAdmin = false,
                        IsPrivate = false,
                        IsHidden = false,
                        IsWarning = false
                    };

                    db.ChatMessages.Add(msg);
                    db.SaveChanges();
                }
            }
            return RedirectToAction("Index", new { clubId = clubId });
        }

        protected override void Dispose(bool disposing) { if (disposing) db.Dispose(); base.Dispose(disposing); }
    }
}