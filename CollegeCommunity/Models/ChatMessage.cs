using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollegeCommunity.Models
{
    public class ChatMessage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ClubId { get; set; }

        [ForeignKey("ClubId")]
        public virtual Club Club { get; set; }

        [Required]
        public string SenderName { get; set; }
        public string SenderEnrollmentNo { get; set; }
        [Required]
        public string MessageText { get; set; }
        public DateTime Timestamp { get; set; }
        public bool IsAdmin { get; set; } = false;
        public bool IsHidden { get; set; } = false;
        public bool IsWarning { get; set; } = false;

        // NEW FEATURES: Images & Tagging
        public string AttachedImageUrl { get; set; } // External URL for photography club
        public bool IsPrivate { get; set; } = false; // If true, only sender and tagged user can see it
        public string TargetUser { get; set; } // Stores "@John" or "@all"
    }
}