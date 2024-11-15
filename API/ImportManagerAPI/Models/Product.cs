﻿namespace ImportManagerAPI.Models;

public class Product
{
    public long Id {get; set;}

    public string Name { get; set; }

    public string Description { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public User User { get; set; }


}