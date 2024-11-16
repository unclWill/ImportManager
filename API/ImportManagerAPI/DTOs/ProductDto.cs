﻿namespace ImportManagerAPI.DTOs;

public class ProductDto
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public int Quantity { get; set; }
    
    public decimal Price { get; set; }

    public long CategoryId { get; set; }
    
    public Category Category { get; set; }
}