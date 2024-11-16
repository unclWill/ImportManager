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
        try
        {
            if (string.IsNullOrWhiteSpace(loginDto.TaxPayerDocument) || string.IsNullOrWhiteSpace(loginDto.Password))
            {
                return TypedResults.BadRequest("Usuário e senha são obrigatórios.");
            }
            
            var user = await db.Users
                .FirstOrDefaultAsync(u => u.TaxPayerDocument == loginDto.TaxPayerDocument);

            if (user == null || !user.ValidatePassword(loginDto.Password))
            {
                return TypedResults.Unauthorized();
            }
            
            var token = tokenService.GenerateToken(user);

            return TypedResults.Ok(new { Token = token });
        }
        catch (Exception ex)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar fazer login.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static Task<IResult> LogoutAsync(HttpContext context)
    {
        try
        {
            var token = context.Request.Headers["Authorization"].ToString()?.Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return Task.FromResult<IResult>(TypedResults.Unauthorized());
            }
            
            context.Response.Headers.Remove("Authorization");
            
            return Task.FromResult<IResult>(TypedResults.Ok("Logout realizado com sucesso."));
        }
        catch (Exception ex)
        {
            return Task.FromResult<IResult>(TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar fazer logout.",
                statusCode: StatusCodes.Status500InternalServerError
            ));
        }
    }
}