using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SubTracker.Api.Auth;
using SubTracker.Api.Dtos.Subscriptions;
using SubTracker.Api.Services;

namespace SubTracker.Api.Controllers;

[Authorize]
[Route("api/subscriptions")]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class SubscriptionsController(ISubscriptionService subscriptionService) : ApiControllerBase
{
    //------------
    //-----Get all
    //------------

    [HttpGet]
    [ProducesResponseType<List<SubscriptionResponse>>(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<SubscriptionResponse>>> GetAll() =>
        Ok(await subscriptionService.GetAllAsync(User.GetUserId()));


    //--------------
    //-----Get by id
    //--------------

    [HttpGet("{id:int}")]
    [ProducesResponseType<SubscriptionResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SubscriptionResponse>> GetById(int id)
    {
        var result = await subscriptionService.GetByIdAsync(User.GetUserId(), id);
        return ToActionResult(result);
    }


    //-----------
    //-----Create
    //-----------

    [HttpPost]
    [ProducesResponseType<SubscriptionResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<SubscriptionResponse>> Create(SubscriptionRequest request)
    {
        var result = await subscriptionService.CreateAsync(User.GetUserId(), request);
        return ToActionResult(result, response => CreatedAtAction(nameof(GetById), new { id = response.Id }, response));
    }


    //-----------
    //-----Update
    //-----------

    [HttpPut("{id:int}")]
    [ProducesResponseType<SubscriptionResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SubscriptionResponse>> Update(int id, SubscriptionRequest request)
    {
        var result = await subscriptionService.UpdateAsync(User.GetUserId(), id, request);
        return ToActionResult(result);
    }


    //-----------
    //-----Delete
    //-----------

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await subscriptionService.DeleteAsync(User.GetUserId(), id);
        return ToActionResult(result, NoContent);
    }
}
