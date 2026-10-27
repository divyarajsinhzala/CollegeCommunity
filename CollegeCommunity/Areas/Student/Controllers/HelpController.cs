using System;
using System.Web.Mvc;
using CollegeCommunity.Data;
using CollegeCommunity.Models;

namespace CollegeCommunity.Areas.Student.Controllers
{
    public class HelpController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Index()
        {
            if (Session["UserId"] == null) return RedirectToAction("Login", "Account", new { area = "" });
            return View();
        }

        // NEW: Guidelines Page
        public ActionResult Guidelines()
        {
            if (Session["UserId"] == null) return RedirectToAction("Login", "Account", new { area = "" });
            return View();
        }

        // NEW: FAQs Page
        public ActionResult Faqs()
        {
            if (Session["UserId"] == null) return RedirectToAction("Login", "Account", new { area = "" });
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SubmitFeedback(string subject, string message)
        {
            if (Session["UserId"] == null) return RedirectToAction("Login", "Account", new { area = "" });

            if (!string.IsNullOrWhiteSpace(subject) && !string.IsNullOrWhiteSpace(message))
            {
                var feedback = new Feedback
                {
                    StudentId = (int)Session["UserId"],
                    Subject = subject,
                    Message = message,
                    SubmittedAt = DateTime.Now,
                    IsResolved = false
                };

                db.Feedbacks.Add(feedback);
                db.SaveChanges();

                TempData["SuccessMessage"] = "Your message has been sent to the administration.";
            }
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing) { if (disposing) db.Dispose(); base.Dispose(disposing); }
    }
}