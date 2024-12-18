﻿using ImportManagerAPI.Models.Enums;

namespace ImportManagerAPI.DTOs.StockMovementations;

public class StockMovementResponseDto
{
    public long Id { get; set; }
    
    public string UserId { get; set; }
    
    public string UserName { get; set; }
    
    public string TaxPayerDocument { get; set; }
    
    public long ProductId { get; set; }
    
    public string ProductName { get; set; }
    
    public string ProductDescription { get; set; }
    
    public int Quantity { get; set; }
    
    public decimal TotalPrice { get; set; }
    
    public decimal? FeePercentage { get; set; }
    
    public decimal? FeeValue { get; set; }
    
    public DateTime MovementDate { get; set; }
    
    public MovementType MovementType { get; set; }
    
    public bool IsFinalized { get; set; }
}