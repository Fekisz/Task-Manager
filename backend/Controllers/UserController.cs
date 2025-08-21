using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.Models;

namespace TaskManager.Api.Controllers;

[ApiController]

[Route("api/[controller]")] 
public class UserController(AppDbContext db) : ControllerBase
{
  // [HttpGet]
  // public async Task<ActionResult<IEnumerable<User>>> Get() =>
  //   await db.Users.AsNoTracking().ToListAsync();

  // [HttpGet("{id:int}")]
  // public async Task<ActionResult<TaskItem>> GetById(int id) =>
  //   await db.Tasks.FindAsync(id) is { } t ? t : NotFound();

  
}

