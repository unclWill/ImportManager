using AutoMapper;
using ImportManagerAPI.Data;
using ImportManagerAPI.DTOs.StockMovementations;
using ImportManagerAPI.Models;
using ImportManagerAPI.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ImportManagerAPI.Endpoints;

public static class StockMovementEndpoint
{
    public static void AddStockMovementEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/stock-movements").RequireAuthorization();

        group.MapGet("/", GetAsync);
        group.MapGet("/{id}", GetByIdAsync);
        group.MapGet("/filter", GetWithFiltersAsync);
        group.MapPost("", PostAsync).RequireAuthorization("Admin");
        group.MapPut("/{id}", PutAsync).RequireAuthorization("TaxPayer");
        group.MapDelete("/{id}", DeleteAsync).RequireAuthorization("Admin");
    }

    private static async Task<IResult> GetAsync(ImportManagerContext db, IMapper mapper)
    {
        try
        {
            var movements = await db.StockMovimentations
                .Include(m => m.Product)
                .Include(m => m.User)
                .OrderByDescending(m => m.MovementDate)
                .ToListAsync();

            return Results.Ok(mapper.Map<List<StockMovementResponseDto>>(movements));
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar recuperar a lista de movimentações do estoque.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static async Task<IResult> GetByIdAsync(long id, ImportManagerContext db, IMapper mapper)
    {
        try
        {
            if (id <= 0)
                return TypedResults.BadRequest("ID inválido.");

            var movement = await db.StockMovimentations
                .Include(m => m.Product)
                .Include(m => m.User)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (movement == null)
            {
                return TypedResults.NotFound("Movimentação não encontrada.");
            }

            return Results.Ok(mapper.Map<StockMovementResponseDto>(movement));
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: $"Ocorreu um erro ao tentar buscar a movimentação com ID {id}.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static async Task<IResult> GetWithFiltersAsync(
        [AsParameters] StockMovementFilterDto filter,
        ImportManagerContext db,
        IMapper mapper)
    {
        try
        {
            var query = db.StockMovimentations
                .Include(m => m.Product)
                .Include(m => m.User)
                .AsQueryable();

            if (filter.ProductId.HasValue)
            {
                query = query.Where(m => m.ProductId == filter.ProductId.Value);
            }

            if (!string.IsNullOrEmpty(filter.ProductName))
            {
                query = query.Where(m => m.Product.Name.Contains(filter.ProductName));
            }

            if (filter.UserId.HasValue)
            {
                query = query.Where(m => m.UserId == filter.UserId.Value);
            }

            if (filter.MovementType.HasValue)
            {
                query = query.Where(m => m.MovementType == filter.MovementType.Value);
            }

            if (!string.IsNullOrWhiteSpace(filter.TaxPayerDocument))
            {
                query = query.Where(m => m.TaxPayerDocument == filter.TaxPayerDocument);
            }

            if (filter.IsFinalized.HasValue)
            {
                query = query.Where(m => m.IsFinalized == filter.IsFinalized.Value);
            }

            var movements = await query
                .OrderByDescending(m => m.MovementDate)
                .ToListAsync();

            if (movements.Count == 0)
            {
                return TypedResults.NotFound("Nenhuma movimentação encontrada com os filtros especificados.");
            }

            return Results.Ok(mapper.Map<List<StockMovementResponseDto>>(movements));
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar buscar as movimentações com os filtros especificados.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static async Task<IResult> PostAsync([FromBody] StockMovementCreateDto createDto, HttpContext httpContext,
        ImportManagerContext db, IMapper mapper)
    {
        try
        {
            var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !long.TryParse(userIdClaim, out long userId))
            {
                return TypedResults.Problem(
                    detail: "Usuário não identificado.",
                    statusCode: StatusCodes.Status401Unauthorized
                );
            }

            if (createDto == null)
            {
                return TypedResults.BadRequest("Dados da movimentação inválidos.");
            }

            var product = await db.Products.FindAsync(createDto.ProductId);
            if (product == null)
            {
                return TypedResults.NotFound($"Produto com ID {createDto.ProductId} não encontrado.");
            }

            var user = await db.Users.FindAsync(userId);
            if (user == null)
            {
                return TypedResults.NotFound($"Usuário não encontrado.");
            }

            decimal feePercentage = 0;
            decimal unitPrice = 0;

            if (createDto.MovementType == MovementType.Entrada)
            {
                if (!createDto.UnitPrice.HasValue || createDto.UnitPrice.Value <= 0)
                {
                    return TypedResults.BadRequest("Preço unitário é obrigatório para movimentações de entrada.");
                }

                unitPrice = createDto.UnitPrice.Value;
                feePercentage = (decimal)(createDto.FeePercentage ?? 0);

                product.Price = unitPrice;
                product.FeePercentage = feePercentage;
            }
            else
            {
                if (!createDto.FeePercentage.HasValue)
                {
                    return TypedResults.BadRequest("Taxa percentual é obrigatória para movimentações de saída.");
                }

                if (product.Quantity < createDto.Quantity)
                {
                    return TypedResults.BadRequest("Quantidade insuficiente em estoque.");
                }

                unitPrice = product.Price;
                feePercentage = (decimal)createDto.FeePercentage.Value;
            }

            var movement = mapper.Map<StockMovimentation>(createDto);
            movement.UserId = userId;
            movement.TaxPayerDocument = product.OwnerTaxPayerDocument;
            movement.MovementDate = DateTime.Now;
            movement.FeePercentage = feePercentage;

            decimal baseTotal = unitPrice * createDto.Quantity;
            decimal taxAmount = baseTotal * (feePercentage / 100m);
            movement.TotalPrice = baseTotal + taxAmount;

            if (createDto.MovementType == MovementType.Entrada)
            {
                product.Quantity += createDto.Quantity;
            }
            else
            {
                product.Quantity -= createDto.Quantity;
            }

            if (createDto.MovementType == MovementType.Saida)
            {
                movement.IsFinalized = true;
            }

            await db.StockMovimentations.AddAsync(movement);
            await db.SaveChangesAsync();

            return TypedResults.Created($"/stock-movements/{movement.Id}",
                mapper.Map<StockMovementResponseDto>(movement));
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: "Ocorreu um erro ao tentar criar a movimentação de estoque.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }
    
    private static async Task<IResult> PutAsync(
        long id,
        [FromBody] StockMovementUpdateDto updateDto,
        HttpContext httpContext,
        ImportManagerContext db,
        IMapper mapper)
    {
        try
        {
            if (id <= 0)
            {
                return TypedResults.BadRequest("ID inválido.");
            }

            if (updateDto == null)
            {
                return TypedResults.BadRequest("Dados da movimentação inválidos.");
            }

            var existingMovement = await db.StockMovimentations
                .Include(m => m.Product)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (existingMovement == null)
            {
                return TypedResults.NotFound("Movimentação não encontrada.");
            }

            var product = existingMovement.Product;

            // Decrementa a quantidade do produto na tabela de produtos. Habilitar apenas se for necessário.
            // if (updateDto.Quantity > product.Quantity)
            // {
            //     return TypedResults.BadRequest("Quantidade insuficiente em estoque.");
            // }

            decimal? feePercentage = updateDto.FeePercentage ?? product.FeePercentage;
            decimal? feeValue = product.Price * updateDto.Quantity * (feePercentage / 100m);
            decimal? totalPrice = (product.Price * updateDto.Quantity) + feeValue;

            existingMovement.Quantity = updateDto.Quantity;
            existingMovement.FeePercentage = feePercentage;
            existingMovement.MovementType = MovementType.Saida;
            existingMovement.MovementDate = DateTime.Now;
            existingMovement.TotalPrice = (decimal)totalPrice;
            existingMovement.FeeValue = feeValue;
            existingMovement.IsFinalized = updateDto.IsFinalized ?? true;
            existingMovement.UserId = long.Parse(httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            product.Quantity -= updateDto.Quantity;
            await db.SaveChangesAsync();

            return Results.Ok(mapper.Map<StockMovementResponseDto>(existingMovement));
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: $"Ocorreu um erro ao tentar atualizar a movimentação com ID {id}.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    private static async Task<IResult> DeleteAsync(
        long id,
        ImportManagerContext db)
    {
        try
        {
            if (id <= 0)
            {
                return TypedResults.BadRequest("ID inválido.");
            }

            var movement = await db.StockMovimentations
                .Include(m => m.Product)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (movement == null)
            {
                return TypedResults.NotFound("Movimentação não encontrada.");
            }

            if (movement.MovementType == MovementType.Entrada)
            {
                movement.Product.Quantity -= movement.Quantity;
            }
            else
            {
                movement.Product.Quantity += movement.Quantity;
            }

            db.StockMovimentations.Remove(movement);
            await db.SaveChangesAsync();

            return TypedResults.NoContent();
        }
        catch (Exception)
        {
            return TypedResults.Problem(
                detail: $"Ocorreu um erro ao tentar excluir a movimentação com ID {id}.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }
}