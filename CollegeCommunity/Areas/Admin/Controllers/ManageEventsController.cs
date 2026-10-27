
using System;
using System.Linq;
using System.Net;
using System.Data.Entity;
using System.Web.Mvc;
using CollegeCommunity.Data;
using CollegeCommunity.Models;

namespace CollegeCommunity.Areas.Admin.Controllers
{
    public class ManageEventsController : Controller
    {
        private readonly ApplicationDbContext db = new ApplicationDbContext();

        // GET: Admin/ManageEvents
        public ActionResult Index()
        {
            var events = db.Events
                .OrderByDescending(e => e.EventDate)
                .ToList();

            return View(events);
        }

        // GET: Admin/ManageEvents/Create
        public ActionResult Create()
        {
            return View(new Event());
        }

        // POST: Admin/ManageEvents/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Event eventModel)
        {
            if (eventModel == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            if (ModelState.IsValid)
            {
                eventModel.CreatedAt = DateTime.Now;

                if (string.IsNullOrWhiteSpace(eventModel.ImageUrl))
                {
                    eventModel.ImageUrl =
                        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80";
                }

                db.Events.Add(eventModel);
                db.SaveChanges();

                TempData["SuccessMessage"] = "Event created successfully.";
                return RedirectToAction("Index");
            }

            return View(eventModel);
        }

        // GET: Admin/ManageEvents/Edit/5
        public ActionResult Edit(int? id)
        {
            if (!id.HasValue)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var eventModel = db.Events.Find(id.Value);

            if (eventModel == null)
            {
                return HttpNotFound();
            }

            return View(eventModel);
        }

        // POST: Admin/ManageEvents/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Event eventModel)
        {
            if (eventModel == null || id != eventModel.Id)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var existingEvent = db.Events.Find(id);

            if (existingEvent == null)
            {
                return HttpNotFound();
            }

            // Update only fields managed by the event form.
            if (TryUpdateModel(
                existingEvent,
                "",
                new[]
                {
                    "Title",
                    "EventDate",
                    "Location",
                    "ImageUrl",
                    "Description"
                }))
            {
                if (ModelState.IsValid)
                {
                    db.SaveChanges();

                    TempData["SuccessMessage"] = "Event updated successfully.";
                    return RedirectToAction("Index");
                }
            }

            return View(existingEvent);
        }

        // Optional GET confirmation page:
        // GET: Admin/ManageEvents/Delete/5
        public ActionResult Delete(int? id)
        {
            if (!id.HasValue)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var eventModel = db.Events.Find(id.Value);

            if (eventModel == null)
            {
                return HttpNotFound();
            }

            return View(eventModel);
        }

        // Actual deletion:
        // POST: Admin/ManageEvents/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            var eventModel = db.Events.Find(id);

            if (eventModel == null)
            {
                TempData["ErrorMessage"] = "The event was not found. It may already have been deleted.";
                return RedirectToAction("Index");
            }

            try
            {
                db.Events.Remove(eventModel);
                db.SaveChanges();

                TempData["SuccessMessage"] = "Event deleted successfully.";
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateException)
            {
                TempData["ErrorMessage"] =
                    "This event could not be deleted because other records may depend on it.";
            }

            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
