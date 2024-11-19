using AutoMapper;
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
        /*
         * Mapeamentos entre as models e suas respectivas DTOs.
         * O mapeamento mais complexo é o que está sendo feito entre a model do estoque
         * e as suas DTOs, por conta dos relacionamentos existentes.
         */

        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<UserCreateDto, User>();
        CreateMap<LoginDto, User>();
        CreateMap<User, LoginDto>();

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

        CreateMap<StockMovementCreateDto, StockMovimentation>()
            .ForMember(dest => dest.FeePercentage, opt => opt.MapFrom(src => src.FeePercentage ?? 0));

        // Criação de movimentação do estoque.
        CreateMap<StockMovementUpdateDto, StockMovimentation>()
            .ForMember(dest => dest.ProductId, opt => opt.Ignore())
            .ForMember(dest => dest.MovementType, opt => opt.Ignore())
            .ForMember(dest => dest.UserId, opt => opt.Ignore())
            .ForMember(dest => dest.TaxPayerDocument, opt => opt.Ignore())
            .ForMember(dest => dest.MovementDate, opt => opt.Ignore())
            .ForMember(dest => dest.FeePercentage, opt => opt.MapFrom(src => src.FeePercentage))
            .ForMember(dest => dest.IsFinalized, opt => opt.Ignore())
            .ForMember(dest => dest.TotalPrice, opt => opt.Ignore());

        // Retorno ao realizar uam movimentação no estoque.
        CreateMap<StockMovimentation, StockMovementResponseDto>()
            .ForMember(dest => dest.UserName,
                opt => opt.MapFrom(src => src.User != null ? $"{src.User.FirstName} {src.User.LastName}" : string.Empty))
            .ForMember(dest => dest.ProductName,
                opt => opt.MapFrom(src => src.Product != null ? src.Product.Name : string.Empty))
            .ForMember(dest => dest.UserId,
                opt => opt.MapFrom(src => src.UserId.ToString()))
            .ForMember(dest => dest.ProductDescription,
                opt => opt.MapFrom(src => src.Product.Description))
            .ForMember(dest => dest.FeeValue,
                opt => opt.MapFrom(src => src.FeePercentage.HasValue ? src.TotalPrice * (decimal)(src.FeePercentage.Value / (decimal)100.0) : 0));
    }
}