namespace SubTracker.Api.Entities;

public class Subscription
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public BillingInterval BillingInterval { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly NextPaymentDate { get; set; }

    public bool IsActive { get; set; } = true;

    public string? Notes { get; set; }

    public DateTime CreatedAt { get; set; }

    public int CategoryId { get; set; }

    public Category? Category { get; set; }

    public string UserId { get; set; } = string.Empty;

    public AppUser? User { get; set; }

    public List<Payment> Payments { get; set; } = [];

    public decimal MonthlyCost => BillingInterval.ToMonthlyCost(Price);

    public Payment RegisterPayment(decimal amount, DateOnly paidOn)
    {
        var payment = new Payment { Amount = amount, PaidOn = paidOn };

        Payments.Add(payment);
        NextPaymentDate = BillingInterval.NextDateAfter(NextPaymentDate);

        return payment;
    }
}
