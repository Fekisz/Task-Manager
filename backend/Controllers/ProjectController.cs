using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.Models;

namespace TaskManager.Api.Controllers;

// Marks this class as an API controller
[ApiController]

// Sets the route for this controller
[Route("api/[controller]")] 
public class ProjectController(AppDbContext db) : ControllerBase
{

  [HttpGet]
public async Task<ActionResult<IEnumerable<Project>>> Get()
{
    var projects = await db.project.AsNoTracking().ToListAsync();

    return projects;
}


  [HttpGet("{id:int}")]
  public async Task<ActionResult<Project>> GetById(int id) =>
    await db.project.FindAsync(id) is { } t ? t : NotFound();

 
  [HttpPost]
  public async Task<ActionResult<Project>> Create(Project dto) {
    
    db.project.Add(dto);
    await db.SaveChangesAsync();
    return Ok(dto);
  }

  // // PUT: /project/project/{id}
  // // Updates an existing project
  // [HttpPut("{id:int}")]
  // public async Task<IActionResult> Update(int id, Project dto) {
  //   if (id != dto.Id) return BadRequest();
  //   db.Entry(dto).State = EntityState.Modified;
  //   await db.SaveChangesAsync();
  //   return NoContent();
  // }


  [HttpDelete("{id:int}")]
  public async Task<IActionResult> Delete(int id) {
    var t = await db.project.FindAsync(id);
    if (t is null) return NotFound();
    db.project.Remove(t);
    await db.SaveChangesAsync();
    return NoContent();
  }
}

