using ImportManagerAPI.Data;
using ImportManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ImportManagerAPI.Endpoints;

public static class CategoryEndpoint
{
    public static void AddCategoryEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/categories");

        group.MapGet("/", GetAsync);
        group.MapGet("/{id:long?}", GetByIdAsync);
        group.MapPost("", PostAsync);
        group.MapPut("/{id}", PutAsync);
        group.MapDelete("/{id}", DeleteAsync);
    }

    private static async Task<IResult> GetAsync(ImportManagerContext db)
    {
        try
        {
            var categories = await db.Categories.ToListAsync();
            return Results.Ok(categories);
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar recuperar a lista de categorias.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static async Task<IResult> GetByIdAsync(long id, ImportManagerContext db)
    {
        try
        {
            if (id <= 0)
            {
                return TypedResults.BadRequest("O ID fornecido não é válido.");
            }

            var category = await db.Categories.FindAsync(id);
            if (category == null)
            {
                return TypedResults.NotFound($"Categoria com ID {id} não encontrada.");
            }

            return Results.Ok(category);
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar recuperar os dados da categoria.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static async Task<IResult> PostAsync([FromBody] Category category, ImportManagerContext db)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(category.Name))
            {
                return TypedResults.BadRequest("O nome da categoria é obrigatório.");
            }

            var existingCategory = await db.Categories.AnyAsync(c => c.Name == category.Name);
            if (existingCategory)
            {
                return TypedResults.Conflict($"Já existe uma categoria cadastrada com o nome {category.Name}");
            }

            db.Categories.Add(category);
            await db.SaveChangesAsync();

            return TypedResults.Created($"/categories/{category.Id}", category);
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: "Erro ao salvar os dados no banco. Por favor, tente novamente.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static async Task<IResult> PutAsync(long id, [FromBody] Category category, ImportManagerContext db)
    {
        try
        {
            if (id <= 0)
            {
                return TypedResults.BadRequest("O ID da categoria deve ser maior que zero.");
            }

            if (string.IsNullOrWhiteSpace(category.Name))
            {
                return TypedResults.BadRequest("O nome da categoria é obrigatório.");
            }

            var existingCategory = await db.Categories.FindAsync(id);
            if (existingCategory == null)
            {
                return TypedResults.NotFound("Categoria não encontrada.");
            }

            var duplicateName = await db.Categories.AnyAsync(c => 
                c.Name == category.Name && 
                c.Id != id);
            if (duplicateName)
            {
                return TypedResults.Conflict($"Já existe uma categoria cadastrada com o nome {category.Name}");
            }

            existingCategory.Name = category.Name;
            await db.SaveChangesAsync();

            return TypedResults.Ok(existingCategory);
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: "Erro ao salvar as alterações no banco de dados. Por favor, tente novamente.",
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
                return TypedResults.BadRequest("O ID da categoria deve ser maior que zero.");
            }

            var category = await db.Categories.FindAsync(id);
            if (category == null)
            {
                return TypedResults.NotFound($"Categoria com ID {id} não encontrada.");
            }

            db.Categories.Remove(category);
            await db.SaveChangesAsync();

            return TypedResults.NoContent();
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: "Erro ao tentar remover a categoria. Por favor, tente novamente.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }


}