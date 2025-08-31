using System.ComponentModel.DataAnnotations;

namespace Models;
public class Project
{
    [Key]
    public int id { get; set; }
    public required string name { get; set; } 
    public required string description { get; set; } 
    public int user_id { get; set; }
    // public User User { get; set; } = null!;

    // public List<TaskItem> Tasks { get; set; } = new();
}
