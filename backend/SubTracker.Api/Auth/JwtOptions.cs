using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace SubTracker.Api.Auth;

public class JwtOptions
{
    public const string SectionName = "Jwt";

    [Required]
    public string Issuer { get; set; } = string.Empty;

    [Required]
    public string Audience { get; set; } = string.Empty;

    [Required(ErrorMessage = "Jwt:Key saknas. Lokalt sätts den med dotnet user-secrets (se README.md).")]
    [MinLength(32, ErrorMessage = "Jwt:Key måste vara minst 32 tecken lång.")]
    public string Key { get; set; } = string.Empty;

    [Range(1, 1440)]
    public int ExpiresInMinutes { get; set; } = 60;

    public SymmetricSecurityKey CreateSigningKey() => new(Encoding.UTF8.GetBytes(Key));
}
