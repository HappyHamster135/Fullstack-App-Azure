using SubTracker.Api.Dtos.Categories;
using SubTracker.Api.Entities;

namespace SubTracker.Api.Mappings;

public static class CategoryMappings
{
    public static CategoryResponse ToResponse(this Category category) =>
        new(category.Id, category.Name, category.Color);
}
