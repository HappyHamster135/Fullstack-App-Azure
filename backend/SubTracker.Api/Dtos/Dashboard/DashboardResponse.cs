namespace SubTracker.Api.Dtos.Dashboard;

public record DashboardResponse(
    int ActiveSubscriptions,
    decimal TotalMonthlyCost,
    decimal TotalYearlyCost,
    List<CategoryCostResponse> CostByCategory,
    List<UpcomingPaymentResponse> UpcomingPayments,
    List<MonthlyPaymentResponse> PaymentsByMonth);
