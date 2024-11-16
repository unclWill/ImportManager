using System.ComponentModel.DataAnnotations;

namespace ImportManagerAPI.DTOs;

public class UserDto
{
    public UserDto() { }
    
    public int Id { get; set; }
    
    [MaxLength(40)]
    public string FirstName { get; set; }
    
    [MaxLength(40)]
    public string LastName { get; set; }
    
    [MaxLength(16)]
    public string TaxPayerDocument { get; set; }
    
    [EmailAddress]
    [StringLength(100)]
    public string Email { get; set; }
}