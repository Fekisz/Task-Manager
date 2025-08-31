using Microsoft.EntityFrameworkCore;
using Models;

namespace Data;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<User> Users => Set<User>();
    public DbSet<Project> project => Set<Project>();
    public DbSet<TaskItem> task => Set<TaskItem>();
}
