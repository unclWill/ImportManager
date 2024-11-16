using AutoMapper;
using ImportManagerAPI.Data;
using ImportManagerAPI.DTOs;
using ImportManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ImportManagerAPI.Endpoints;

public static class ProductEndpoint
{
    public static void AddProductEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/products");

        group.MapGet("/", GetAsync);
        group.MapGet("/{id}", GetByIdAsync);
        group.MapPost("", PostAsync);
        group.MapPut("/{id}", PutAsync);
        group.MapDelete("/{id}", DeleteAsync);
    }

    private static async Task<IResult> GetAsync(ImportManagerContext db, IMapper mapper)
    {   
        try
        {
            var products = await db.Products.Include(p => p.Category).ToListAsync();
            var productDtos = mapper.Map<List<ProductDto>>(products);

            return Results.Ok(productDtos);
        }
        catch (Exception ex)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar recuperar a lista de produtos.",
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

            var product = await db.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return TypedResults.NotFound($"Produto {id} não encontrado.");
            }

            var productDto = mapper.Map<ProductDto>(product);
            return Results.Ok(productDto);
        }
        catch (Exception ex)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar recuperar os produtos.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
        
    }

    private static async Task<IResult> PostAsync([FromBody] ProductDto productDto, ImportManagerContext db, IMapper mapper)
    {
        try
        {
            if (productDto == null)
            {
                return TypedResults.BadRequest("O corpo da requisição está vazio ou é inválido.");
            }

            var category = await db.Categories.FindAsync(productDto.CategoryId);
            if (category == null)
            {
                return TypedResults.BadRequest("Categoria não encontrada.");
            }

            db.Entry(category).State = EntityState.Unchanged;

            var product = mapper.Map<Product>(productDto);

            db.Products.Add(product);
            await db.SaveChangesAsync();

            return TypedResults.Created($"/products/{product.Id}", product);
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
                title: "Ocorreu um erro ao tentar criar o produto",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
       
    }

    private static async Task<IResult> PutAsync(long id, ProductDto productDto, ImportManagerContext db, IMapper mapper)
    {   
        try
        {
            if (id <= 0)
            {
                return TypedResults.BadRequest("O ID do produto deve ser maior que zero.");
            }


            var product = await db.Products.FindAsync(id);    
            if (product == null)
            {
                return TypedResults.NotFound("Produto não encontrado.");
            }

            mapper.Map(productDto, product);

            var category = await db.Categories.FindAsync(product.CategoryId);
            if (category == null)
            {
                return TypedResults.BadRequest("Categoria inválida.");
            }

            await db.SaveChangesAsync();

            var updatedProductDto = mapper.Map<ProductDto>(product);
            return TypedResults.Ok(updatedProductDto);
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

            var product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return TypedResults.NotFound($"Produto {id} não encontrado.");
            }

            db.Products.Remove(product);
            await db.SaveChangesAsync();

            return TypedResults.NoContent();
        }
         catch (DbUpdateException ex)
        {
            return TypedResults.Problem(
                detail: "Erro ao tentar remover o produto. Por favor, tente novamente.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
        catch (Exception ex)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro inesperado ao tentar remover o produto. Por favor, entre em contato com o suporte.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
        
    }

}