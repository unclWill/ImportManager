using ImportManagerAPI.Models.Enums;

namespace ImportManagerAPI.DTOs;

public class LoginDto
{
    public string TaxPayerDocument { get; set; }
    
    public string Password { get; set; }
    
    private Role Role { get; set; }
}