using SubTracker.Api.Common;
using SubTracker.Api.Dtos.Subscriptions;
using SubTracker.Api.Entities;

namespace SubTracker.Api.Mappings;

public static class SubscriptionMappings
{
    public static SubscriptionResponse ToResponse(this Subscription subscription) => new(
        subscription.Id,
        subscription.Name,
        subscription.Price,
        subscription.BillingInterval,
        Money.Round(subscription.MonthlyCost),
        subscription.StartDate,
        subscription.NextPaymentDate,
        subscription.IsActive,
        subscription.Notes,
        subscription.Category!.ToResponse());

    public static void ApplyTo(this SubscriptionRequest request, Subscription subscription, Category category)
    {
        subscription.Name = request.Name.Trim();
        subscription.Price = request.Price.GetValueOrDefault();
        subscription.BillingInterval = request.BillingInterval.GetValueOrDefault();
        subscription.StartDate = request.StartDate.GetValueOrDefault();
        subscription.NextPaymentDate = request.NextPaymentDate.GetValueOrDefault();
        subscription.IsActive = request.IsActive;
        subscription.Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim();
        subscription.CategoryId = category.Id;
        subscription.Category = category;
    }
}
