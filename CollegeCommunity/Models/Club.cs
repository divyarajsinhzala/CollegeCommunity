using System;
using System.ComponentModel.DataAnnotations;

namespace CollegeCommunity.Models
{
    public class Club
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        // The property that was missing:
        public string ImageUrl { get; set; }
    }
}