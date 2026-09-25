using System.ComponentModel.DataAnnotations;
using SubTracker.Api.Entities;

namespace SubTracker.Api.Dtos.Subscriptions;

public record SubscriptionRequest : IValidatableObject
{
    [Required(ErrorMessage = "Ange ett namn.")]
    [StringLength(100, ErrorMessage = "Namnet får vara högst 100 tecken.")]
    public string Name { get; init; } = string.Empty;

    [Required(ErrorMessage = "Ange ett pris.")]
    [Range(typeof(decimal), "0", "100000", ErrorMessage = "Priset måste vara mellan 0 och 100 000 kr.")]
    public decimal? Price { get; init; }

    [Required(ErrorMessage = "Välj ett betalningsintervall.")]
    [EnumDataType(typeof(BillingInterval), ErrorMessage = "Ogiltigt betalningsintervall.")]
    public BillingInterval? BillingInterval { get; init; }

    [Required(ErrorMessage = "Ange ett startdatum.")]
    public DateOnly? StartDate { get; init; }

    [Required(ErrorMessage = "Ange nästa betalningsdatum.")]
    public DateOnly? NextPaymentDate { get; init; }

    public bool IsActive { get; init; } = true;

    [StringLength(500, ErrorMessage = "Anteckningen får vara högst 500 tecken.")]
    public string? Notes { get; init; }

    [Required(ErrorMessage = "Välj en kategori.")]
    public int? CategoryId { get; init; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (StartDate is not null && NextPaymentDate < StartDate)
        {
            yield return new ValidationResult(
                "Nästa betalning kan inte vara före startdatumet.",
                [nameof(NextPaymentDate)]);
        }
    }
}
