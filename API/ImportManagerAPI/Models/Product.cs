using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ImportManagerAPI.Models;

[Table("Products")]
public class Product
{
    [Key] 
    public long Id { get; set; }

    [MaxLength(50)] 
    public string Name { get; set; }

    [MaxLength(100)] 
    public string Description { get; set; }

    public int Quantity { get; set; }

    [Column(TypeName = "decimal(18,2)")] 
    public decimal Price { get; set; }

    public long UserId { get; set; }
    [ForeignKey("UserId")] 
    public User Owner { get; set; }

    public long CategoryId { get; set; }
    [ForeignKey("CategoryId")] 
    public Category Category { get; set; }
}