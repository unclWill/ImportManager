using System.ComponentModel.DataAnnotations;

namespace ImportManagerAPI.DTOs.StockMovementations;

public class StockMovementUpdateDto
{
    [Required]
    public int Quantity { get; set; }
    
    [Required]
    public decimal TotalPrice { get; set; }
    
    public bool? IsFinalized { get; set; }
}