using System.Collections.Generic;
using CollegeCommunity.Models;

namespace CollegeCommunity.ViewModels
{
    public class StudentDashboardViewModel
    {
        public string StudentFirstName { get; set; }
        public int TotalStudents { get; set; }
        public int TotalClubs { get; set; }
        public int TotalEvents { get; set; }
        public int TotalAlerts { get; set; }

        public IEnumerable<Event> UpcomingEvents { get; set; }
        public IEnumerable<Announcement> Announcements { get; set; }

        // NEW: Property to hold dynamic recent chats
        public IEnumerable<ChatMessage> RecentChats { get; set; }
    }
}