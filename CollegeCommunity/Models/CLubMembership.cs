using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollegeCommunity.Models
{
    public class ClubMembership
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int StudentId { get; set; }

        [ForeignKey("StudentId")]
        public virtual Student Student { get; set; }

        [Required]
        public int ClubId { get; set; }

        [ForeignKey("ClubId")]
        public virtual Club Club { get; set; }

        public DateTime JoinedAt { get; set; }
    }
}