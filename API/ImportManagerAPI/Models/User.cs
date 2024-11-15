using ImportManagerAPI.Models.Enums;

namespace ImportManagerAPI.Models;

public class User
{
    public long Id { get; set; }
    
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public string Login { get; set; }
    
    public string Password { get; set; }
    
    public string Cpf { get; set; }
    
    public string Email { get; set; }
    
    public Role Role { get; set; }

    // public ICollection<Products> Products { get; set; } = new List<Products>();
    
}