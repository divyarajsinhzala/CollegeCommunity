using System.Linq;
using System.Web.Mvc;
using CollegeCommunity.Data;

namespace CollegeCommunity.Areas.Student.Controllers
{
    public class EventsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Student/Events
        public ActionResult Index()
        {
            // This grabs the events from the database so the Model is not null
            var events = db.Events.OrderByDescending(e => e.EventDate).ToList();
            return View(events);
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