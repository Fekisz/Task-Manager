namespace TaskManager.Api.Models;
public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public required string Password { get; set; }
    public DateOnly Date_of_registration { get; set; }
}

