using AutoMapper;
using ImportManagerAPI.Data;
using ImportManagerAPI.DTOs;
using ImportManagerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ImportManagerAPI.Endpoints;

public static class UserEndpoint
{
    public static void AddUserEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/users");

        group.MapGet("/", GetAsync);
        group.MapGet("/{id}", GetByIdAsync);
        // group.MapGet("/{taxPayerDocument}/", GetByTaxPayerDocumentAsync);
        group.MapPost("", PostAsync);
        group.MapPut("/{id}", PutAsync);
        group.MapDelete("/{id}", DeleteAsync);
    }

    private static async Task<IResult> GetAsync(ImportManagerContext db, IMapper mapper)
    {
        var users = await db.Users.ToListAsync();
        var usersDto = mapper.Map<List<UserDto>>(users);
        
        return Results.Ok(usersDto);
    }
    
    private static async Task<IResult> GetByIdAsync(long id, ImportManagerContext db, IMapper mapper)
    {
        var user = await db.Users.FindAsync(id);
        if (user == null)
        {
            return TypedResults.NotFound();
        }
        
        var userDto = mapper.Map<UserDto>(user);
        return Results.Ok(userDto);
    }
    
    private static async Task<IResult> GetByTaxPayerDocumentAsync(string taxPayerDocument, ImportManagerContext db, IMapper mapper)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.TaxPayerDocument == taxPayerDocument);

        if (user == null)
        {
            return TypedResults.NotFound();
        }
        
        var userDto = mapper.Map<UserDto>(user);
        return Results.Ok(userDto);
    }

    private static async Task<IResult> PostAsync(UserCreateDto userCreateDto, ImportManagerContext db, IMapper mapper)
    {
        try
        {

        }
        catch (Exception ex)
        {
            
        }
        
        var createdUser = await db.Users.AnyAsync(u => u.TaxPayerDocument == userCreateDto.TaxPayerDocument);
        if (createdUser)
        {
            return TypedResults.Conflict($"Já existe um usuário cadastrado com o documento {userCreateDto.TaxPayerDocument}");
        }

        var user = mapper.Map<User>(userCreateDto);
        
        if (!string.IsNullOrEmpty(userCreateDto.Password))
        {
            user.SetPassword(userCreateDto.Password);
        }
        
        db.Users.Add(user);
        await db.SaveChangesAsync();
        
        var userDto = mapper.Map<UserDto>(user);
        return TypedResults.Created($"/users/{userDto.Id}", userDto);
    }

    private static async Task<IResult> PutAsync(long id, UserUpdateDto userUpdateDto, ImportManagerContext db, IMapper mapper)
    {
        var user = await db.Users.FindAsync(id);
        if (user == null)
        {
            return TypedResults.NotFound("Usuário não encontrado.");
        }
        
        mapper.Map(userUpdateDto, user);

        if (!string.IsNullOrEmpty(userUpdateDto.Password))
        {
            user.SetPassword(userUpdateDto.Password);
        }
        
        await db.SaveChangesAsync();
        var userDto = mapper.Map<UserDto>(user);
        return TypedResults.Ok(userDto);
    }

    private static async Task<IResult> DeleteAsync(long id, ImportManagerContext db)
    {
        var user = await db.Users.FindAsync(id);
        if (user == null)
        {
            return TypedResults.NotFound("Usuário não encontrado.");
        }
        
        db.Users.Remove(user);
        await db.SaveChangesAsync();
        
        return TypedResults.NoContent();
    }
}