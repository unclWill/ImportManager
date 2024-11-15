using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ImportManagerAPI.Models;

[Table("Categories")]
public class Category
{
    [Key]
    public long Id { get; set; }

    [MaxLength(50)]
    public string Name { get; set; }

    public ICollection<Product> Products { get; set; }
}