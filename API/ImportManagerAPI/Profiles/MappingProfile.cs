using AutoMapper;
using ImportManagerAPI.DTOs;
using ImportManagerAPI.DTOs.Products;
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
    }
}