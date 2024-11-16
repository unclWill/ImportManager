using System.Text.Json.Serialization;
using AutoMapper;
using ImportManagerAPI.Data;
using ImportManagerAPI.Endpoints;
using Microsoft.EntityFrameworkCore;

namespace ImportManagerAPI;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.WebHost.UseUrls("http://localhost:5000", "https://localhost:5001");

        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
        
        // Adicionando o DbContext
        builder.Services.AddDbContext<ImportManagerContext>(options =>
            options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
        );
        
        // Add services to the container.
        builder.Services.AddAuthorization();

        // Mapeamentos.
        builder.Services.AddAutoMapper(typeof(MappingProfile));
        
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins", corsPolicyBuilder =>
            {
                corsPolicyBuilder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });
        
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        //app.UseHttpsRedirection();

        app.UseAuthorization();
        
        app.AddUserEndpoints();

        app.AddProductEndpoints();

        app.AddCategoryEndpoints();
        
        app.MapControllers();

        app.Run();
    }
}