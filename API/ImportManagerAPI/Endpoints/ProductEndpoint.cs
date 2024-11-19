using AutoMapper;
using ImportManagerAPI.Data;
using ImportManagerAPI.DTOs.Products;
using ImportManagerAPI.Models;
using ImportManagerAPI.Models.Enums;
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

    private static async Task<IResult> GetByOwnerTaxPayerDocumentAsync(string taxPayerDocument, ImportManagerContext db,
        IMapper mapper)
    {
        if (string.IsNullOrWhiteSpace(taxPayerDocument))
        {
            return TypedResults.BadRequest("Documento do proprietário é obrigatório.");
        }

        var products = await db.Products
            .Include(p => p.Owner)
            .Where(p => p.Owner.TaxPayerDocument == taxPayerDocument)
            .ToListAsync();

        if (products.Count == 0)
        {
            return TypedResults.NotFound("Nenhum produto encontrado.");
        }

        var productDtos = mapper.Map<List<ProductDto>>(products);
        return Results.Ok(productDtos);
    }
    
    private static async Task<IResult> PostAsync([FromBody] ProductCreateDto productCreateDto, ImportManagerContext db,
        IMapper mapper)
    {
        try
        {
            if (productCreateDto == null || string.IsNullOrWhiteSpace(productCreateDto.Name))
            {
                return TypedResults.BadRequest("Dados do produto inválidos.");
            }

            var user = await db.Users.FirstOrDefaultAsync(u =>
                u.TaxPayerDocument == productCreateDto.OwnerTaxPayerDocument);

            if (user == null)
            {
                return TypedResults.BadRequest("Usuário não encontrado.");
            }

            using var transaction = await db.Database.BeginTransactionAsync();

            try
            {
                var product = mapper.Map<Product>(productCreateDto);
                await db.Products.AddAsync(product);
                await db.SaveChangesAsync();
                
                var stockMovement = new StockMovimentation
                {
                    UserId = user.Id,
                    ProductId = product.Id,
                    Quantity = product.Quantity,
                    MovementType = MovementType.Entrada,
                    MovementDate = DateTime.UtcNow,
                    FeePercentage = product.FeePercentage ?? 0,
                    FeeValue = product.FeePercentage.HasValue 
                        ? product.Price * (product.FeePercentage.Value / 100m)
                        : 0,
                    TotalPrice = product.FeePercentage.HasValue 
                        ? (product.Price + (product.Price * (product.FeePercentage.Value / 100m))) * product.Quantity
                        : product.Price * product.Quantity,
                    TaxPayerDocument = productCreateDto.OwnerTaxPayerDocument,
                    IsFinalized = false
                };
                
                await db.StockMovimentations.AddAsync(stockMovement);
                await db.SaveChangesAsync();

                await transaction.CommitAsync();

                var createdProductDto = mapper.Map<ProductDto>(product);
                return TypedResults.Created($"/products/{product.Id}", createdProductDto);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar criar o produto.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static async Task<IResult> PutAsync(long id, [FromBody] ProductDto productDto, ImportManagerContext db,
        IMapper mapper)
    {
        try
        {
            if (id <= 0 || productDto == null || string.IsNullOrWhiteSpace(productDto.Name))
            {
                return TypedResults.BadRequest("Dados inválidos.");
            }

            var product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return TypedResults.NotFound("Produto não encontrado.");
            }

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
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar atualizar os dados do produto.",
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
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar excluir o produto.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }
}