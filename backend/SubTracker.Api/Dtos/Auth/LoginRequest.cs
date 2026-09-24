using System.ComponentModel.DataAnnotations;

namespace SubTracker.Api.Dtos.Auth;

public record LoginRequest
{
    [Required(ErrorMessage = "Ange din e-postadress.")]
    [EmailAddress(ErrorMessage = "Ange en giltig e-postadress.")]
    public string Email { get; init; } = string.Empty;

    [Required(ErrorMessage = "Ange ditt lösenord.")]
    public string Password { get; init; } = string.Empty;
}
