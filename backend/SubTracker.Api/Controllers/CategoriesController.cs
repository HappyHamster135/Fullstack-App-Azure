using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SubTracker.Api.Auth;
using SubTracker.Api.Dtos.Categories;
using SubTracker.Api.Services;

namespace SubTracker.Api.Controllers;

[Authorize]
[Route("api/categories")]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class CategoriesController(ICategoryService categoryService) : ApiControllerBase
{
    //------------
    //-----Get all
    //------------

    [HttpGet]
    [ProducesResponseType<List<CategoryResponse>>(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<CategoryResponse>>> GetAll() =>
        Ok(await categoryService.GetAllAsync(User.GetUserId()));


    //--------------
    //-----Get by id
    //--------------

    [HttpGet("{id:int}")]
    [ProducesResponseType<CategoryResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CategoryResponse>> GetById(int id)
    {
        var result = await categoryService.GetByIdAsync(User.GetUserId(), id);
        return ToActionResult(result);
    }


    //-----------
    //-----Create
    //-----------

    [HttpPost]
    [ProducesResponseType<CategoryResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<CategoryResponse>> Create(CategoryRequest request)
    {
        var result = await categoryService.CreateAsync(User.GetUserId(), request);
        return ToActionResult(result, response => CreatedAtAction(nameof(GetById), new { id = response.Id }, response));
    }


    //-----------
    //-----Update
    //-----------

    [HttpPut("{id:int}")]
    [ProducesResponseType<CategoryResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<CategoryResponse>> Update(int id, CategoryRequest request)
    {
        var result = await categoryService.UpdateAsync(User.GetUserId(), id, request);
        return ToActionResult(result);
    }


    //-----------
    //-----Delete
    //-----------

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await categoryService.DeleteAsync(User.GetUserId(), id);
        return ToActionResult(result, NoContent);
    }
}
