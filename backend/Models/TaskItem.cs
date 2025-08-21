namespace TaskManager.Api.Models;
public class TaskItem
{
    public int id { get; set; }
    public string title { get; set; } = string.Empty;
    public string description { get; set; } = string.Empty;
    public bool state { get; set; } =false;
    public int project_id { get; set; }

}
