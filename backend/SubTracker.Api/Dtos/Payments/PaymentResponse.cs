namespace SubTracker.Api.Dtos.Payments;

public record PaymentResponse(int Id, decimal Amount, DateOnly PaidOn);
