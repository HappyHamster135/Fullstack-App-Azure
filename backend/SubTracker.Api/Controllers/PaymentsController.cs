using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SubTracker.Api.Auth;
using SubTracker.Api.Dtos.Payments;
using SubTracker.Api.Services;

namespace SubTracker.Api.Controllers;

[Authorize]
[Route("api/subscriptions/{subscriptionId:int}/payments")]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class PaymentsController(IPaymentService paymentService) : ApiControllerBase
{
    //------------
    //-----Get all
    //------------

    [HttpGet]
    [ProducesResponseType<List<PaymentResponse>>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<PaymentResponse>>> GetAll(int subscriptionId)
    {
        var result = await paymentService.GetAllAsync(User.GetUserId(), subscriptionId);
        return ToActionResult(result);
    }


    //-----------
    //-----Create
    //-----------

    [HttpPost]
    [ProducesResponseType<PaymentResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PaymentResponse>> Create(int subscriptionId, PaymentRequest request)
    {
        var result = await paymentService.CreateAsync(User.GetUserId(), subscriptionId, request);
        return ToActionResult(result, response => StatusCode(StatusCodes.Status201Created, response));
    }


    //-----------
    //-----Delete
    //-----------

    [HttpDelete("{paymentId:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int subscriptionId, int paymentId)
    {
        var result = await paymentService.DeleteAsync(User.GetUserId(), subscriptionId, paymentId);
        return ToActionResult(result, NoContent);
    }
}
