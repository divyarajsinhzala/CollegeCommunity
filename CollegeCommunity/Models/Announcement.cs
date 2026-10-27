using System;
using System.ComponentModel.DataAnnotations;

namespace CollegeCommunity.Models
{
    public class Announcement
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime DatePosted { get; set; } = DateTime.Now;

        public string Type { get; set; } // e.g., "info", "warning", "important"
    }
}