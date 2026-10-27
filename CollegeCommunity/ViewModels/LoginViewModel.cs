using System.ComponentModel.DataAnnotations;

namespace CollegeCommunity.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Enrollment or GR Number is required.")]
        public string IdentifierNumber { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}