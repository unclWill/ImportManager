using AutoMapper;
using ImportManagerAPI.DTOs;
using ImportManagerAPI.Models;

namespace ImportManagerAPI;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<Product, ProductDto>();
        CreateMap<User, UserCreateDto>();
        CreateMap<UserUpdateDto, User>()
            .ForMember(dest => dest.Password, opt 
                => opt.Condition(src => !string.IsNullOrEmpty(src.Password)));
        CreateMap<UserCreateDto, User>();
        CreateMap<LoginDto, User>();
        CreateMap<User, LoginDto>();
    }
}