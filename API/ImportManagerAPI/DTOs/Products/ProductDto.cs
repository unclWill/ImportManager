using ImportManagerAPI.Models.Enums;

namespace ImportManagerAPI.DTOs.Products;

public class ProductDto
{
    public long Id { get; set; }
    
    public string Name { get; set; }

    public string Description { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }
    
    public decimal? FeePercentage { get; set; }

    public Category Category { get; set; }

    public string OwnerTaxPayerDocument { get; set; } 
}