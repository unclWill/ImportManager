using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ImportManagerAPI.Models.Enums;

namespace ImportManagerAPI.DTOs.StockMovementations;

public class StockMovementCreateDto
{
    [Required]
    public long ProductId { get; set; }
    
    [Required]
    public int Quantity { get; set; }
    
    public string TaxPayerDocument { get; set; }
    
    [Required]
    public MovementType MovementType { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? UnitPrice { get; set; }
    
    public double? FeePercentage { get; set; }
}