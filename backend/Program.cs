
using Microsoft.EntityFrameworkCore;

using TaskManager.Api.Models;
using TaskManager.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(o =>
  o.AddDefaultPolicy(p => p.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5173")));


builder.Services.AddAuthentication().AddJwtBearer(); // konfigurację JWT dodasz w kroku D
builder.Services.AddAuthorization();
builder.Services.AddControllers();
var app = builder.Build();
app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();


// app.UseHttpsRedirection();


app.Run();

