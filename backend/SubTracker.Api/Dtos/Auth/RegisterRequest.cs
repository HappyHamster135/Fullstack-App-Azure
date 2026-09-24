using System.ComponentModel.DataAnnotations;

namespace SubTracker.Api.Dtos.Auth;

public record RegisterRequest
{
    [Required(ErrorMessage = "Ange en e-postadress.")]
    [EmailAddress(ErrorMessage = "Ange en giltig e-postadress.")]
    [StringLength(256, ErrorMessage = "E-postadressen får vara högst 256 tecken.")]
    public string Email { get; init; } = string.Empty;

    [Required(ErrorMessage = "Ange ett lösenord.")]
    [StringLength(100, MinimumLength = 8, ErrorMessage = "Lösenordet måste vara 8–100 tecken.")]
    public string Password { get; init; } = string.Empty;
}
