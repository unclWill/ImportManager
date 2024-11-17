using AutoMapper;
using ImportManagerAPI.DTOs;
using ImportManagerAPI.DTOs.Auth;
using ImportManagerAPI.DTOs.Products;
using ImportManagerAPI.DTOs.StockMovementations;
using ImportManagerAPI.DTOs.Users;
using ImportManagerAPI.Models;

namespace ImportManagerAPI.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<ProductCreateDto, Product>();
        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.OwnerTaxPayerDocument,
                opt => opt.MapFrom(src => src.OwnerTaxPayerDocument));
        
        CreateMap<ProductDto, Product>()
            .ForMember(dest => dest.OwnerTaxPayerDocument,
                opt => opt.MapFrom(src => src.OwnerTaxPayerDocument))
            .ForMember(dest => dest.Id, opt => opt.Ignore());
                
        CreateMap<User, UserCreateDto>();
        CreateMap<UserUpdateDto, User>()
            .ForMember(dest => dest.Password,
                opt => opt.Condition(src => !string.IsNullOrEmpty(src.Password)));
                
        CreateMap<UserCreateDto, User>();
        CreateMap<LoginDto, User>();
        CreateMap<User, LoginDto>();
        
        CreateMap<StockMovementCreateDto, StockMovimentation>()
            .ForMember(dest => dest.MovementDate, 
                opt => opt.MapFrom(src => DateTime.UtcNow))
            .ForMember(dest => dest.TotalPrice,
                opt => opt.Ignore());

        CreateMap<StockMovementUpdateDto, StockMovimentation>()
            .ForMember(dest => dest.MovementDate, opt => opt.Ignore())
            .ForMember(dest => dest.UserId, opt => opt.Ignore())
            .ForMember(dest => dest.ProductId, opt => opt.Ignore())
            .ForMember(dest => dest.MovementType, opt => opt.Ignore());

        CreateMap<StockMovimentation, StockMovementResponseDto>()
            .ForMember(dest => dest.UserName,
                opt => opt.MapFrom(src => $"{src.User.FirstName} {src.User.LastName}"))
            .ForMember(dest => dest.ProductName,
                opt => opt.MapFrom(src => src.Product.Name));
    }
}