using System;
using System.ComponentModel.DataAnnotations;

namespace CollegeCommunity.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string EnrollmentNo { get; set; }

        [Required]
        public string GRNumber { get; set; }

        [Required]
        public string MobileNo { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [EmailAddress]
        public string CollegeEmail { get; set; }

        [Required]
        public string Branch { get; set; }

        [Required]
        public string Department { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public int Semester { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        // Flag to identify administrators
        public bool IsAdmin { get; set; } = false;
    }
}