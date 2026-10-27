using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollegeCommunity.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int StudentId { get; set; }

        [ForeignKey("StudentId")]
        public virtual Student Student { get; set; }

        [Required, StringLength(100)]
        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }

        public DateTime SubmittedAt { get; set; }

        public bool IsResolved { get; set; }
    }
}