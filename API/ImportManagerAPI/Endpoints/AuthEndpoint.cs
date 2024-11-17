using ImportManagerAPI.Data;
using ImportManagerAPI.DTOs;
using ImportManagerAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ImportManagerAPI.Endpoints;

public static class AuthEndpoint
{
    public static void AddAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/auth");
        
        group.MapPost("/login", LoginAsync).AllowAnonymous();
        group.MapPost("/logout", LogoutAsync).RequireAuthorization();
    }

    private static async Task<IResult> LoginAsync([FromBody] LoginDto loginDto, ImportManagerContext db, TokenService tokenService)
    {
        if (string.IsNullOrWhiteSpace(loginDto.TaxPayerDocument) || string.IsNullOrWhiteSpace(loginDto.Password))
        {
            return TypedResults.BadRequest("CPF/CNPJ e a senha são campos de preenchimento obrigatório!");
        }

        try
        {
            var user = await db.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.TaxPayerDocument == loginDto.TaxPayerDocument);

            if (user == null || !user.ValidatePassword(loginDto.Password))
            {
                return TypedResults.Unauthorized();
            }
            
            var token = tokenService.GenerateToken(user);
            return TypedResults.Ok(new { token });
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar fazer login!",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static IResult LogoutAsync(HttpContext context)
    {
        try
        {
            var token = context.Request.Headers.Authorization.ToString()?.Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return TypedResults.Unauthorized();
            }
            
            context.Response.Headers.Remove("Authorization");
            return TypedResults.Ok("Logout realizado com sucesso!");
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar fazer logout.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }
}