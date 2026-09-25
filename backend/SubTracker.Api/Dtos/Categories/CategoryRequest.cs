using System.ComponentModel.DataAnnotations;

namespace SubTracker.Api.Dtos.Categories;

public record CategoryRequest
{
    [Required(ErrorMessage = "Ange ett namn.")]
    [StringLength(50, ErrorMessage = "Namnet får vara högst 50 tecken.")]
    public string Name { get; init; } = string.Empty;

    [Required(ErrorMessage = "Välj en färg.")]
    [RegularExpression("^#[0-9a-fA-F]{6}$", ErrorMessage = "Färgen måste vara en hexkod, t.ex. #0d6efd.")]
    public string Color { get; init; } = string.Empty;
}
