
using Microsoft.EntityFrameworkCore;

using Models;
using Data;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(o =>
  o.AddDefaultPolicy(p => p.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5173")));


builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();
builder.Services.AddControllers();
var app = builder.Build();
app.MapControllers();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();




app.Run();

