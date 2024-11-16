using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ImportManagerAPI.Models.Enums;

namespace ImportManagerAPI.DTOs;

public class UserUpdateDto
{
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? Password { get; set; }
    
    [EmailAddress]
    [StringLength(100)]
    public string? Email { get; set; }
    
    public Role? Role { get; set; }
}