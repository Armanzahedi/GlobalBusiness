using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using FluentValidation;

namespace GlobalBusiness.Infrastructure.DTOs.Auth
{
    public class RegisterDto
    {
        private ParentNode _parentNode;

        public ParentNode ParentNode
        {
            get => _parentNode ??= new ParentNode();
            set => _parentNode = value;
        }

        public string ReferralLink { get; set; }
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Lastname { get; set; }

        [Required]
        [Display(Name = "Passport number")]
        //[RegularExpression("^(?!^0+$)[a-zA-Z0-9]{3,20}$",ErrorMessage = "Please enter a valid passport number")]
        public string PassportNumber { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
        //[Required]
        //public bool AgreedToTerms { get; set; }
    }

    public class ParentNode
    {
        public string Name { get; set; }
        public string Image { get; set; }
    }
}
