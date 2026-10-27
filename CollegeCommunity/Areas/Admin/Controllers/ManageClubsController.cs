using System;
using System.Linq;
using System.Net;
using System.Data.Entity;
using System.Web.Mvc;
using CollegeCommunity.Data;
using CollegeCommunity.Models;

namespace CollegeCommunity.Areas.Admin.Controllers
{
    public class ManageClubsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // ==========================================
        // 1. CORE CLUB CRUD (Create, Read, Update, Delete)
        // ==========================================

        // GET: Admin/ManageClubs
        public ActionResult Index()
        {
            var clubs = db.Clubs.OrderBy(c => c.Name).ToList();

            // Calculate how many members are in each club
            var memberCounts = db.ClubMemberships
                .GroupBy(cm => cm.ClubId)
                .ToDictionary(g => g.Key, g => g.Count());

            ViewBag.MemberCounts = memberCounts;
            return View(clubs);
        }

        // GET: Admin/ManageClubs/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/ManageClubs/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Club club)
        {
            if (ModelState.IsValid)
            {
                if (string.IsNullOrWhiteSpace(club.ImageUrl))
                {
                    club.ImageUrl = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80";
                }
                db.Clubs.Add(club);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(club);
        }

        // GET: Admin/ManageClubs/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            Club club = db.Clubs.Find(id);
            if (club == null) return HttpNotFound();

            return View(club);
        }

        // POST: Admin/ManageClubs/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Club club)
        {
            if (ModelState.IsValid)
            {
                db.Entry(club).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(club);
        }

        // POST: Admin/ManageClubs/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            var club = db.Clubs.Find(id);
            if (club != null)
            {
                db.Clubs.Remove(club);
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        // ==========================================
        // 2. MEMBER MANAGEMENT 
        // ==========================================

        // GET: Show list of students inside a specific club
        public ActionResult Members(int id)
        {
            var club = db.Clubs.Find(id);
            if (club == null) return HttpNotFound();

            ViewBag.ClubName = club.Name;
            ViewBag.ClubId = club.Id;

            // Fetch the memberships and include the associated Student data
            var members = db.ClubMemberships.Include("Student").Where(cm => cm.ClubId == id).ToList();
            return View(members);
        }

        // POST: Kick a student out of a club
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RemoveMember(int membershipId, int clubId)
        {
            var membership = db.ClubMemberships.Find(membershipId);
            if (membership != null)
            {
                db.ClubMemberships.Remove(membership);
                db.SaveChanges();
            }
            return RedirectToAction("Members", new { id = clubId });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}