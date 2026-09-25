namespace SubTracker.Api.Entities;

public class Payment
{
    public int Id { get; set; }

    public decimal Amount { get; set; }

    public DateOnly PaidOn { get; set; }

    public int SubscriptionId { get; set; }

    public Subscription? Subscription { get; set; }
}
