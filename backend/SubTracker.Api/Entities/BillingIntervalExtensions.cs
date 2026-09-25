namespace SubTracker.Api.Entities;

public static class BillingIntervalExtensions
{
    public static decimal ToMonthlyCost(this BillingInterval interval, decimal price) => interval switch
    {
        BillingInterval.Weekly => price * 52 / 12,
        BillingInterval.Monthly => price,
        BillingInterval.Quarterly => price / 3,
        BillingInterval.Yearly => price / 12,
        _ => throw new ArgumentOutOfRangeException(nameof(interval)),
    };

    public static DateOnly NextDateAfter(this BillingInterval interval, DateOnly date) => interval switch
    {
        BillingInterval.Weekly => date.AddDays(7),
        BillingInterval.Monthly => date.AddMonths(1),
        BillingInterval.Quarterly => date.AddMonths(3),
        BillingInterval.Yearly => date.AddYears(1),
        _ => throw new ArgumentOutOfRangeException(nameof(interval)),
    };
}
