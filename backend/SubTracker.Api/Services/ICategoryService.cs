using SubTracker.Api.Common;
using SubTracker.Api.Dtos.Categories;

namespace SubTracker.Api.Services;

public interface ICategoryService
{
    Task<List<CategoryResponse>> GetAllAsync(string userId);

    Task<ServiceResult<CategoryResponse>> GetByIdAsync(string userId, int id);

    Task<ServiceResult<CategoryResponse>> CreateAsync(string userId, CategoryRequest request);

    Task CreateDefaultsAsync(string userId);

    Task<ServiceResult<CategoryResponse>> UpdateAsync(string userId, int id, CategoryRequest request);

    Task<ServiceResult> DeleteAsync(string userId, int id);
}
