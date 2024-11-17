using ImportManagerAPI.Models.Enums;

namespace ImportManagerAPI.DTOs.StockMovementations;

public class StockMovementFilterDto
{
    public DateTime? StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }
    
    public long? ProductId { get; set; }
    
    public long? UserId { get; set; }
    
    public MovementType? MovementType { get; set; }
    
    public bool? IsFinalized { get; set; }
}