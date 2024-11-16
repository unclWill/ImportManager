using AutoMapper;
using ImportManagerAPI.Data;
using ImportManagerAPI.DTOs;
using ImportManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ImportManagerAPI.Endpoints;

public static class UserEndpoint
{
    public static void AddUserEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/users");

        group.MapGet("/", GetAsync);//.RequireAuthorization();
        group.MapGet("/{id:long?}", GetByIdAsync);//.RequireAuthorization();
        group.MapGet("/identify/{taxPayerDocument}", GetByTaxPayerDocumentAsync);
        group.MapPost("", PostAsync);
        group.MapPut("/{id}", PutAsync);
        group.MapDelete("/{id}", DeleteAsync);
    }

    private static async Task<IResult> GetAsync(ImportManagerContext db, IMapper mapper)
    {
        try
        {
            var users = await db.Users.ToListAsync();
            var usersDto = mapper.Map<List<UserDto>>(users);
            
            return Results.Ok(usersDto);
        }
        catch (Exception ex)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar recuperar a lista de usuários.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }
    
    private static async Task<IResult> GetByIdAsync(long id, ImportManagerContext db, IMapper mapper)
    {
        try
        {
            if (id <= 0)
            {
                return TypedResults.BadRequest("O ID fornecido não é válido.");
            }

            var user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return TypedResults.NotFound($"Usuário com ID {id} não encontrado.");
            }

            var userDto = mapper.Map<UserDto>(user);
            return Results.Ok(userDto);
        }
        catch (Exception ex)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar recuperar os dados do usuário.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
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

    private static async Task<IResult> PostAsync([FromBody] UserCreateDto userCreateDto, ImportManagerContext db, IMapper mapper)
    {
        try
        {
            if (userCreateDto == null)
            {
                return TypedResults.BadRequest("O corpo da requisição está vazio ou é inválido.");
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
        catch (DbUpdateException ex)
        {
            return TypedResults.Problem(
                detail: "Erro ao salvar os dados no banco. Por favor, tente novamente.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
        catch (AutoMapperMappingException ex)
        {
            return TypedResults.Problem(
                detail: ex.Message,
                title: "Ocorreu um erro ao tentar criar o usuário",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static async Task<IResult> PutAsync(long id, UserUpdateDto userUpdateDto, ImportManagerContext db, IMapper mapper)
    {
        try
        {
            if (id <= 0)
            {
                return TypedResults.BadRequest("O ID do usuário deve ser maior que zero.");
            }

            if (userUpdateDto == null)
            {
                return TypedResults.BadRequest("O corpo da requisição está vazio ou é inválido.");
            }

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
        catch (DbUpdateException ex)
        {
            return TypedResults.Problem(
                detail: "Erro ao salvar as alterações no banco de dados. Por favor, tente novamente.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
        catch (AutoMapperMappingException ex)
        {
            return TypedResults.Problem(
                detail: "Erro ao mapear os dados. Verifique as configurações do mapeamento.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
        catch (Exception ex)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro inesperado. Por favor, entre em contato com o suporte.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static async Task<IResult> DeleteAsync(long id, ImportManagerContext db)
    {
        try
        {
            if (id <= 0)
            {
                return TypedResults.BadRequest("O ID do usuário deve ser maior que zero.");
            }

            var user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return TypedResults.NotFound($"Usuário com ID {id} não encontrado.");
            }

            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return TypedResults.NoContent();
        }
        catch (DbUpdateException ex)
        {
            return TypedResults.Problem(
                detail: "Erro ao tentar remover o usuário. Por favor, tente novamente.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
        catch (Exception ex)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro inesperado ao tentar remover o usuário. Por favor, entre em contato com o suporte.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }
}