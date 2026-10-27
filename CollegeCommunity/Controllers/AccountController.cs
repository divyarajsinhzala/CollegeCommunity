using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Security;
using CollegeCommunity.Data;
using CollegeCommunity.Models;
using CollegeCommunity.ViewModels;

namespace CollegeCommunity.Controllers
{
    public class AccountController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Account/Login
        [HttpGet]
        public ActionResult Login()
        {
            if (Session["UserName"] != null)
            {
                return RedirectToAction("Index", "Dashboard", new { area = "Student" });
            }
            if (Session["AdminName"] != null)
            {
                return RedirectToAction("Index", "Dashboard", new { area = "Admin" });
            }

            return View();
        }

        // POST: Account/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = db.Students.FirstOrDefault(s =>
                    (s.EnrollmentNo == model.IdentifierNumber || s.GRNumber == model.IdentifierNumber) &&
                    s.PasswordHash == model.Password);

                if (user != null)
                {
                    // ==========================================
                    // MAINTENANCE MODE CHECK
                    // ==========================================
                    bool isMaintenance = HttpContext.Application["MaintenanceMode"] as bool? ?? false;

                    if (isMaintenance && !user.IsAdmin)
                    {
                        // Block standard students, let Admins through!
                        ModelState.AddModelError("", "The portal is currently down for maintenance. Only administrators can log in at this time.");
                        return View(model);
                    }

                    // Proceed with standard login setup
                    Session["UserId"] = user.Id;
                    Session["UserName"] = user.FirstName;
                    Session["Branch"] = user.Branch;

                    FormsAuthentication.SetAuthCookie(user.EnrollmentNo, false);

                    if (user.IsAdmin)
                    {
                        Session["AdminName"] = user.FirstName + " " + user.LastName;
                        return RedirectToAction("Index", "Dashboard", new { area = "Admin" });
                    }

                    return RedirectToAction("Index", "Dashboard", new { area = "Student" });
                }

                ModelState.AddModelError("", "Invalid login attempt. Please check your credentials.");
            }

            return View(model);
        }

        // GET: Account/Logout
        public ActionResult Logout()
        {
            Session.Clear();
            Session.Abandon();
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Account", new { area = "" });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}