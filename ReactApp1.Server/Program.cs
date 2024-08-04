using pokedex.Server.Services;
using pokedex.Server.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Register the PokemonRepository as a service that has a lifetime of a scoped service.
builder.Services.AddScoped<IPokemonRepository, PokemonRepository>();

// Register the PokemonRepository as a service that has a lifetime of a singleton service.
// builder.Services.AddSingleton<IPokemonRepository, PokemonRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
