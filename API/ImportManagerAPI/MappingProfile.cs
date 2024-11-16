using AutoMapper;
using ImportManagerAPI.DTOs;
using ImportManagerAPI.Models;

namespace ImportManagerAPI;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();

        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.Category.Id));
        CreateMap<ProductDto, Product>()
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => new Category { Id = src.CategoryId }));
             
        CreateMap<User, UserCreateDto>();
        CreateMap<UserUpdateDto, User>()
            .ForMember(dest => dest.Password, opt 
                => opt.Condition(src => !string.IsNullOrEmpty(src.Password)));
        CreateMap<UserCreateDto, User>();
        CreateMap<LoginDto, User>();
        CreateMap<User, LoginDto>();
    }
}