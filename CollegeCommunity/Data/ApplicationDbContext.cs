using System.Data.Entity;
using CollegeCommunity.Models;

namespace CollegeCommunity.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() : base("DefaultConnection")
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Club> Clubs { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<ClubMembership> ClubMemberships { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }
    }
}