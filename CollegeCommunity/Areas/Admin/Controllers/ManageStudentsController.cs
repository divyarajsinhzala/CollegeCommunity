using System;
using System.Linq;
using System.Web.Mvc;
using CollegeCommunity.Data;
using CollegeCommunity.Models;

namespace CollegeCommunity.Areas.Admin.Controllers
{
    public class ManageStudentsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Admin/ManageStudents
        public ActionResult Index()
        {
            // Fetch Admins and pass them via ViewBag
            ViewBag.Admins = db.Students.Where(s => s.IsAdmin).OrderBy(s => s.EnrollmentNo).ToList();

            // Fetch standard students as the primary Model
            var students = db.Students.Where(s => !s.IsAdmin).OrderBy(s => s.EnrollmentNo).ToList();

            return View(students);
        }

        // POST: Admin/ManageStudents/Promote
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Promote(int id)
        {
            var student = db.Students.Find(id);
            if (student != null)
            {
                student.IsAdmin = true;
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        // POST: Admin/ManageStudents/Demote (Make Student)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Demote(int id)
        {
            var adminUser = db.Students.Find(id);
            if (adminUser != null)
            {
                adminUser.IsAdmin = false;
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        // POST: Admin/ManageStudents/Delete
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            var student = db.Students.Find(id);
            if (student != null)
            {
                db.Students.Remove(student);
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}