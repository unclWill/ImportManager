using ImportManagerAPI.Models.Enums;

namespace ImportManagerAPI.Models;

public class StockMovement
{
    public long Id { get; set; }
    
    public long UserId { get; set; }
    
    public long ProductId { get; set; }
    
    public Product Product { get; set; }
    
    public int Quantity { get; set; }
    
    public decimal Price { get; set; }
    
    public DateTime MovementDate { get; set; }
    
    public MovementType MovementType { get; set; }
}