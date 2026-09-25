using SubTracker.Api.Dtos.Categories;

namespace SubTracker.Api.Dtos.Dashboard;

public record CategoryCostResponse(CategoryResponse Category, decimal MonthlyCost, int SubscriptionCount);
