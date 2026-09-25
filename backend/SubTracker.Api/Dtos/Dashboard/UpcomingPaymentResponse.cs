using SubTracker.Api.Dtos.Categories;

namespace SubTracker.Api.Dtos.Dashboard;

public record UpcomingPaymentResponse(
    int SubscriptionId,
    string Name,
    decimal Amount,
    DateOnly DueDate,
    CategoryResponse Category);
