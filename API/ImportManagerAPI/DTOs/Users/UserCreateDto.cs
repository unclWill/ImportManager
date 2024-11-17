using System.ComponentModel.DataAnnotations;
using ImportManagerAPI.Models.Enums;

namespace ImportManagerAPI.DTOs.Users;

public class UserCreateDto
{
    [Required]
    [MaxLength(40)]
    public string FirstName { get; set; }
    
    [Required]
    [MaxLength(40)]
    public string LastName { get; set; }
    
    [Required]
    [MaxLength(40)]
    public string Password { get; set; }
    
    [Required]
    [MaxLength(16)]
    public string TaxPayerDocument { get; set; }
    
    [Required]
    [EmailAddress]
    [StringLength(100)]
    public string Email { get; set; }

    public Role Role { get; set; }
}