using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ImportManagerAPI.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace ImportManagerAPI.Models;

[Table("Users")]
[Index(nameof(TaxPayerDocument), IsUnique=true)]
public class User
{
    [Key]
    public long Id { get; set; }
    
    [MaxLength(40)]
    public string FirstName { get; set; }
    
    [MaxLength(40)]
    public string LastName { get; set; }
    
    [MaxLength(40)]
    public string Password { get; set; }
    
    [MaxLength(16)]
    public string TaxPayerDocument { get; set; }
    
    [EmailAddress]
    [StringLength(100)]
    public string Email { get; set; }

    [Column(TypeName = "TEXT")] 
    public Role Role { get; set; } = Role.TaxPayer;

    public void SetPassword(string password)
    {
        Password = BCrypt.Net.BCrypt.HashPassword(password);
    }
    
    public bool ValidatePassword(string password)
    {
        return BCrypt.Net.BCrypt.Verify(password, Password);
    }
}