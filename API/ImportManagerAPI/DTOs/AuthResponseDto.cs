using ImportManagerAPI.Models.Enums;

namespace ImportManagerAPI.DTOs;

public class AuthResponseDto
{
    public long Id { get; set; }
    
    public string FirstName { get; set; }
    
    public Role Role { get; set; }
    
    public string Token { get; set; }
}