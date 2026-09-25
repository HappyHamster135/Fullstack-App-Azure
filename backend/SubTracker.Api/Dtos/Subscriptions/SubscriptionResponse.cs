using SubTracker.Api.Dtos.Categories;
using SubTracker.Api.Entities;

namespace SubTracker.Api.Dtos.Subscriptions;

public record SubscriptionResponse(
    int Id,
    string Name,
    decimal Price,
    BillingInterval BillingInterval,
    decimal MonthlyCost,
    DateOnly StartDate,
    DateOnly NextPaymentDate,
    bool IsActive,
    string? Notes,
    CategoryResponse Category);
