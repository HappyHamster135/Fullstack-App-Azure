using System.ComponentModel.DataAnnotations;

namespace SubTracker.Api.Dtos.Payments;

public record PaymentRequest
{
    [Range(typeof(decimal), "0", "100000", ErrorMessage = "Beloppet måste vara mellan 0 och 100 000 kr.")]
    public decimal? Amount { get; init; }

    public DateOnly? PaidOn { get; init; }
}
