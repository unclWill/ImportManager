using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ImportManagerAPI.Authorization;
using ImportManagerAPI.Models;
using Microsoft.IdentityModel.Tokens;

namespace ImportManagerAPI.Services;

public class TokenService
{
    public string GenerateToken(User user)
    {
        var handler = new JwtSecurityTokenHandler();
        var token = handler.CreateToken(GetTokenDescriptor(user));
        return handler.WriteToken(token);
    }

    private static SigningCredentials GetCredentials()
    {
        var key = Encoding.ASCII.GetBytes(AuthConfig.Instance.PrivateKey);
        
        return new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature
        );
    }

    private static ClaimsIdentity GenerateClaims(User user)
    {
        var ci = new ClaimsIdentity();
        ci.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
        ci.AddClaim(new Claim(ClaimTypes.Name, user.FirstName));
        ci.AddClaim(new Claim(ClaimTypes.Actor, user.TaxPayerDocument));
        ci.AddClaim(new Claim(ClaimTypes.Role, user.Role.ToString()));

        return ci;
    }
    
    private static SecurityTokenDescriptor GetTokenDescriptor(User user)
    {
        {
            return new SecurityTokenDescriptor
            {
                Subject = GenerateClaims(user),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = GetCredentials(),
                Issuer = "ImportManagerAPI",
                Audience = "ImportManagerAPI"
            };
        }
    }
}