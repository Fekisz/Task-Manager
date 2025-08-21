using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.JsonPatch;
using TaskManager.Api.Data;
using TaskManager.Api.Models;

namespace TaskManager.Api.Controllers;

[ApiController]

[Route("api/[controller]")]
public class TaskController(AppDbContext db) : ControllerBase
{
  [HttpGet("{id:int}")]
  public async Task<ActionResult<IEnumerable<TaskItem>>> Get(int id)
  {
     var tasks = await db.task
        .Where(t => t.project_id == id)
        .ToListAsync();
    return tasks;
  }

  [HttpPost]
  public async Task<ActionResult<Project>> Create(TaskItem dto) {
    
    db.task.Add(dto);
    await db.SaveChangesAsync();
    return Ok(dto);
  }
  // [HttpGet("{id:int}")]
  // public async Task<ActionResult<TaskItem>> GetById(int id) =>
  //   await db.Tasks.FindAsync(id) is { } t ? t : NotFound();

  // [HttpPost]
  // public async Task<ActionResult<TaskItem>> Create(TaskItem dto) {
  //   db.Tasks.Add(dto);
  //   await db.SaveChangesAsync();
  //   return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
  // }
public class UpdateTaskStateDto
{
    public bool State { get; set; }
}

[HttpPatch("{id:int}")]
public async Task<IActionResult> PatchState(int id, UpdateTaskStateDto dto)
{
    var entity = await db.task.FindAsync(id);
    if (entity == null)
        return NotFound();

    entity.state = dto.State;
    await db.SaveChangesAsync();

    return NoContent();
}

  [HttpDelete("{id:int}")]
  public async Task<IActionResult> Delete(int id) {
    var t = await db.task.FindAsync(id);
    if (t is null) return NotFound();
    db.task.Remove(t);
    await db.SaveChangesAsync();
    return NoContent();
  }
}

