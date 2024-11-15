using System.Text.Json.Serialization;
using ImportManagerAPI.Data;
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

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.Run();
    }
}