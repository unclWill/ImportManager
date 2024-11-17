using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ImportManagerAPI.Models.Enums;

namespace ImportManagerAPI.Models;

[Table("StockMovimentations")]
public class StockMovimentation
{
    [Key]
    public long Id { get; set; }
    
    public long UserId { get; set; }

    [ForeignKey("UserId")]
    public User User {get; set;}
    
    public string TaxPayerDocument { get; set; }
    
    public long ProductId { get; set; }
    
    [ForeignKey("ProductId")]
    public Product Product { get; set; }
    
    public int Quantity { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalPrice { get; set; }
    
    public DateTime MovementDate { get; set; }
    
    public MovementType MovementType { get; set; }

    public bool IsFinalized { get; set; }
}