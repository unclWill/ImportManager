using System.ComponentModel.DataAnnotations;

namespace ImportManagerAPI.DTOs.StockMovementations;

public class StockMovementUpdateDto
{
    public int Quantity { get; set; }
    
    //public decimal? TotalPrice { get; set; }
    
    public decimal? FeePercentage { get; set; }
    
    public bool? IsFinalized { get; set; }
}