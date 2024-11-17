using AutoMapper;
using ImportManagerAPI.Data;
using ImportManagerAPI.DTOs.Products;
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
        group.MapGet("/owner/{taxPayerDocument}", GetByOwnerTaxPayerDocumentAsync);
        group.MapPost("", PostAsync);
        group.MapPut("/{id}", PutAsync);
        group.MapDelete("/{id}", DeleteAsync);
    }

    private static async Task<IResult> GetAsync(ImportManagerContext db, IMapper mapper)
    {
        try
        {
            var products = await db.Products
                .Include(p => p.Owner)
                .ToListAsync();
                
            var productDtos = mapper.Map<List<ProductDto>>(products);
            return Results.Ok(productDtos);
        }
        catch (Exception)
        {
            return TypedResults.Problem("Erro ao buscar produtos.", statusCode: 500);
        }
    }

    private static async Task<IResult> GetByIdAsync(long id, ImportManagerContext db, IMapper mapper)
    {
        if (id <= 0)
        {
            return TypedResults.BadRequest("ID inválido.");
        }
        
        var product = await db.Products
            .Include(p => p.Owner)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            return TypedResults.NotFound("Produto não encontrado.");
        }
        
        var productDto = mapper.Map<ProductDto>(product);
        return Results.Ok(productDto);
    }

    private static async Task<IResult> GetByOwnerTaxPayerDocumentAsync(string taxPayerDocument, ImportManagerContext db, IMapper mapper)
    {
        if (string.IsNullOrWhiteSpace(taxPayerDocument))
            return TypedResults.BadRequest("Documento do proprietário é obrigatório.");

        var products = await db.Products
            .Include(p => p.Owner)
            .Where(p => p.Owner.TaxPayerDocument == taxPayerDocument)
            .ToListAsync();

        if (!products.Any())
        {
            return TypedResults.NotFound("Nenhum produto encontrado.");
        }
        
        var productDtos = mapper.Map<List<ProductDto>>(products);
        return Results.Ok(productDtos);
    }
    
    private static async Task<IResult> PostAsync([FromBody] ProductCreateDto productCreateDto, ImportManagerContext db, IMapper mapper)
    {
        try
        {
            if (productCreateDto == null || string.IsNullOrWhiteSpace(productCreateDto.Name))
            {
                return TypedResults.BadRequest("Dados do produto inválidos.");
            }
            
            var user = await db.Users.FirstOrDefaultAsync(u => u.TaxPayerDocument == productCreateDto.OwnerTaxPayerDocument);

            if (user == null)
            {
                return TypedResults.BadRequest("Usuário não encontrado.");
            }
            
            var product = mapper.Map<Product>(productCreateDto);
            await db.Products.AddAsync(product);
            await db.SaveChangesAsync();

            var createdProductDto = mapper.Map<ProductDto>(product);
            return TypedResults.Created($"/products/{product.Id}", createdProductDto);
        }
        catch (Exception)
        {
            return TypedResults.Problem("Erro ao criar produto.", statusCode: 500);
        }
    }

    private static async Task<IResult> PutAsync(long id, [FromBody] ProductDto productDto, ImportManagerContext db, IMapper mapper)
    {
        try
        {
            if (id <= 0 || productDto == null || string.IsNullOrWhiteSpace(productDto.Name))
            {
                return TypedResults.BadRequest("Dados inválidos.");
            }
            
            var product = await db.Products.FindAsync(id);
            if (product == null)
                return TypedResults.NotFound("Produto não encontrado.");
            
            var user = await db.Users.FirstOrDefaultAsync(u => u.TaxPayerDocument == productDto.OwnerTaxPayerDocument);
            if (user == null)
            {
                return TypedResults.BadRequest("Usuário não encontrado.");
            }
            
            mapper.Map(productDto, product);
            await db.SaveChangesAsync();

            return Results.Ok(mapper.Map<ProductDto>(product));
        }
        catch (Exception)
        {
            return TypedResults.Problem("Erro ao atualizar produto.", statusCode: 500);
        }
    }

    private static async Task<IResult> DeleteAsync(long id, ImportManagerContext db)
    {
        try
        {
            if (id <= 0)
            {
                return TypedResults.BadRequest("ID inválido.");
            }

            var product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return TypedResults.NotFound("Produto não encontrado.");
            }
            
            db.Products.Remove(product);
            await db.SaveChangesAsync();

            return TypedResults.NoContent();
        }
        catch (Exception)
        {
            return TypedResults.Problem("Erro ao excluir produto.", statusCode: 500);
        }
    }
}