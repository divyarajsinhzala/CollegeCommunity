namespace CollegeCommunity.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<CollegeCommunity.Data.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "CollegeCommunity.Data.ApplicationDbContext";
        }

        protected override void Seed(CollegeCommunity.Data.ApplicationDbContext context)
        {
            // NOTE: If you have existing Student seed code, you can keep it here. 
            // Entity Framework will not delete your active database students or user-created data.

            // Seed Clubs (7)
            /*
            context.Clubs.AddOrUpdate(c => c.Name,
                new CollegeCommunity.Models.Club { Name = "AI & Robotics Society", Description = "Dive into machine learning, automated systems, and competitive robotics building.", ImageUrl = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80" },
                new CollegeCommunity.Models.Club { Name = "E-Sports Syndicate", Description = "Competitive gaming club organizing internal tournaments and college-level leagues.", ImageUrl = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80" },
                new CollegeCommunity.Models.Club { Name = "Photography Enthusiasts", Description = "Capture moments. We hold weekly photo walks and digital editing workshops.", ImageUrl = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80" },
                new CollegeCommunity.Models.Club { Name = "Green Earth Eco-Warriors", Description = "Dedicated to campus sustainability, tree planting, and recycling awareness.", ImageUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80" },
                new CollegeCommunity.Models.Club { Name = "Literary & Debate Society", Description = "Enhance your public speaking, poetry, and creative writing skills.", ImageUrl = "https://images.unsplash.com/photo-1474932430478-367d16b99031?w=800&q=80" },
                new CollegeCommunity.Models.Club { Name = "Rhythm Music & Band", Description = "For vocalists, instrumentalists, and music producers. Jam sessions every Friday.", ImageUrl = "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80" },
                new CollegeCommunity.Models.Club { Name = "Startup Incubator", Description = "Got a business idea? Connect with mentors, pitch ideas, and build products.", ImageUrl = "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=800&q=80" }
            );

            // Seed Events (5)
            context.Events.AddOrUpdate(e => e.Title,
                new CollegeCommunity.Models.Event { Title = "Annual Tech Symposium 2026", Description = "A 2-day technical fest featuring coding competitions, hackathons, and guest lectures.", EventDate = DateTime.Now.AddDays(15), Location = "Main Auditorium", ImageUrl = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
                new CollegeCommunity.Models.Event { Title = "Winter Cultural Fest", Description = "Dance, music, and theatrical performances by various college departments.", EventDate = DateTime.Now.AddDays(25), Location = "Open Air Theatre", ImageUrl = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" },
                new CollegeCommunity.Models.Event { Title = "Cloud Computing Workshop", Description = "Hands-on session on AWS and Azure deployment basics. Bring your laptops.", EventDate = DateTime.Now.AddDays(5), Location = "Computer Lab 3", ImageUrl = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" },
                new CollegeCommunity.Models.Event { Title = "Alumni Meet & Greet", Description = "Network with graduated seniors working in top tech companies.", EventDate = DateTime.Now.AddDays(40), Location = "College Banquet Hall", ImageUrl = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80" },
                new CollegeCommunity.Models.Event { Title = "Inter-College Sports Meet", Description = "Track and field, football, and basketball tournaments against rival colleges.", EventDate = DateTime.Now.AddDays(10), Location = "Sports Ground", ImageUrl = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80" }
            );

            // Seed Announcements (7)
            context.Announcements.AddOrUpdate(a => a.Title,
                new CollegeCommunity.Models.Announcement { Title = "Campus Wi-Fi Maintenance", Description = "The campus Wi-Fi network will be down for scheduled upgrades this Sunday from 2 AM to 6 AM.", Type = "yellow", DatePosted = DateTime.Now.AddDays(-1) },
                new CollegeCommunity.Models.Announcement { Title = "Mid-Semester Examinations", Description = "The timetable for mid-semester exams has been published. Exams commence next Monday.", Type = "red", DatePosted = DateTime.Now.AddDays(-2) },
                new CollegeCommunity.Models.Announcement { Title = "Diwali Holidays Declared", Description = "The campus will remain closed for 5 days next month for Diwali celebrations. Enjoy the break!", Type = "green", DatePosted = DateTime.Now.AddDays(-3) },
                new CollegeCommunity.Models.Announcement { Title = "Library Timing Extension", Description = "Due to upcoming exams, the main library will now remain open until 11:30 PM.", Type = "blue", DatePosted = DateTime.Now.AddDays(-4) },
                new CollegeCommunity.Models.Announcement { Title = "Bus Route Update", Description = "Students taking Route 4, please note a temporary diversion due to road construction.", Type = "yellow", DatePosted = DateTime.Now.AddDays(-5) },
                new CollegeCommunity.Models.Announcement { Title = "Urgent: ID Card Renewal", Description = "All 5th-semester students must renew their smart ID cards at the admin block before Friday.", Type = "red", DatePosted = DateTime.Now.AddDays(-6) },
                new CollegeCommunity.Models.Announcement { Title = "Call for Magazine Submissions", Description = "Submit your articles, poems, and artwork for the annual college magazine by the end of the month.", Type = "blue", DatePosted = DateTime.Now.AddDays(-7) }
            );

            context.SaveChanges();
            */
        }
    }
}