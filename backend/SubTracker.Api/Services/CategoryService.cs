using Microsoft.EntityFrameworkCore;
using SubTracker.Api.Common;
using SubTracker.Api.Data;
using SubTracker.Api.Dtos.Categories;
using SubTracker.Api.Entities;
using SubTracker.Api.Mappings;

namespace SubTracker.Api.Services;

public class CategoryService(AppDbContext db) : ICategoryService
{
    private static readonly ServiceError NotFound =
        ServiceError.NotFound("Kategorin finns inte.");

    private static readonly ServiceError DuplicateName =
        ServiceError.Conflict("Du har redan en kategori med det namnet.");

    private static readonly ServiceError InUse =
        ServiceError.Conflict("Kategorin används av en eller flera prenumerationer.");

    private static readonly (string Name, string Color)[] Defaults =
    [
        ("Streaming", "#dc3545"),
        ("Musik", "#198754"),
        ("Mjukvara", "#0d6efd"),
        ("Spel", "#6f42c1"),
        ("Nyheter & media", "#fd7e14"),
        ("Övrigt", "#6c757d"),
    ];


    //---------
    //-----Read
    //---------

    public async Task<List<CategoryResponse>> GetAllAsync(string userId)
    {
        var categories = await db.Categories
            .Where(c => c.UserId == userId)
            .OrderBy(c => c.Name)
            .ToListAsync();

        return categories.Select(c => c.ToResponse()).ToList();
    }

    public async Task<ServiceResult<CategoryResponse>> GetByIdAsync(string userId, int id)
    {
        var category = await FindOwnedAsync(userId, id);

        return category is null
            ? ServiceResult<CategoryResponse>.Failure(NotFound)
            : ServiceResult<CategoryResponse>.Success(category.ToResponse());
    }


    //-----------
    //-----Create
    //-----------

    public async Task<ServiceResult<CategoryResponse>> CreateAsync(string userId, CategoryRequest request)
    {
        if (await NameExistsAsync(userId, request.Name))
        {
            return ServiceResult<CategoryResponse>.Failure(DuplicateName);
        }

        var category = new Category { Name = request.Name.Trim(), Color = request.Color, UserId = userId };

        db.Categories.Add(category);
        await db.SaveChangesAsync();

        return ServiceResult<CategoryResponse>.Success(category.ToResponse());
    }

    public async Task CreateDefaultsAsync(string userId)
    {
        var categories = Defaults.Select(d => new Category { Name = d.Name, Color = d.Color, UserId = userId });

        db.Categories.AddRange(categories);
        await db.SaveChangesAsync();
    }


    //-----------
    //-----Update
    //-----------

    public async Task<ServiceResult<CategoryResponse>> UpdateAsync(string userId, int id, CategoryRequest request)
    {
        var category = await FindOwnedAsync(userId, id);

        if (category is null)
        {
            return ServiceResult<CategoryResponse>.Failure(NotFound);
        }

        if (await NameExistsAsync(userId, request.Name, excludeId: id))
        {
            return ServiceResult<CategoryResponse>.Failure(DuplicateName);
        }

        category.Name = request.Name.Trim();
        category.Color = request.Color;
        await db.SaveChangesAsync();

        return ServiceResult<CategoryResponse>.Success(category.ToResponse());
    }


    //-----------
    //-----Delete
    //-----------

    public async Task<ServiceResult> DeleteAsync(string userId, int id)
    {
        var category = await FindOwnedAsync(userId, id);

        if (category is null)
        {
            return ServiceResult.Failure(NotFound);
        }

        if (await db.Subscriptions.AnyAsync(s => s.CategoryId == id))
        {
            return ServiceResult.Failure(InUse);
        }

        db.Categories.Remove(category);
        await db.SaveChangesAsync();

        return ServiceResult.Success();
    }


    //------------
    //-----Helpers
    //------------

    private Task<Category?> FindOwnedAsync(string userId, int id) =>
        db.Categories.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

    private Task<bool> NameExistsAsync(string userId, string name, int? excludeId = null)
    {
        var trimmedName = name.Trim();
        return db.Categories.AnyAsync(c => c.UserId == userId && c.Name == trimmedName && c.Id != excludeId);
    }
}
