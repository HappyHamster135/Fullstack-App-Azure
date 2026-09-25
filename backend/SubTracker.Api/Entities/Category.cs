namespace SubTracker.Api.Entities;

public class Category
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Color { get; set; } = string.Empty;

    public string UserId { get; set; } = string.Empty;

    public AppUser? User { get; set; }

    public List<Subscription> Subscriptions { get; set; } = [];
}
