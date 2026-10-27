using System;
using System.Linq;
using System.Web.Mvc;
using CollegeCommunity.Data;
using CollegeCommunity.ViewModels;

namespace CollegeCommunity.Areas.Student.Controllers
{
    public class DashboardController : Controller
    {
        public ActionResult Index()
        {
            if (Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Account", new { area = "" });
            }

            int studentId = (int)Session["UserId"];
            var currentStudentName = Session["UserName"]?.ToString();

            using (var db = new ApplicationDbContext())
            {
                // Find which clubs the student is actually a member of
                var joinedClubIds = db.ClubMemberships
                    .Where(cm => cm.StudentId == studentId)
                    .Select(cm => cm.ClubId)
                    .ToList();

                var viewModel = new StudentDashboardViewModel
                {
                    StudentFirstName = currentStudentName ?? "Student",

                    TotalStudents = db.Students.Count(s => !s.IsAdmin),
                    TotalClubs = db.Clubs.Count(),
                    TotalEvents = db.Events.Count(e => e.EventDate >= DateTime.Now),
                    TotalAlerts = db.Announcements.Count(),

                    UpcomingEvents = db.Events
                        .Where(e => e.EventDate >= DateTime.Now)
                        .OrderBy(e => e.EventDate)
                        .Take(4)
                        .ToList(),

                    Announcements = db.Announcements
                        .OrderByDescending(a => a.DatePosted)
                        .Take(4)
                        .ToList(),

                    // Fetch chats ONLY from clubs the student has joined
                    RecentChats = db.ChatMessages
                        .Include("Club")
                        .Where(m => joinedClubIds.Contains(m.ClubId))
                        .OrderByDescending(m => m.Timestamp)
                        .Take(4)
                        .ToList()
                };

                return View(viewModel);
            }
        }
    }
}