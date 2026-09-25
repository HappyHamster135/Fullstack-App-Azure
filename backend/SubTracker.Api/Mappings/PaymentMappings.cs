using SubTracker.Api.Dtos.Payments;
using SubTracker.Api.Entities;

namespace SubTracker.Api.Mappings;

public static class PaymentMappings
{
    public static PaymentResponse ToResponse(this Payment payment) =>
        new(payment.Id, payment.Amount, payment.PaidOn);
}
