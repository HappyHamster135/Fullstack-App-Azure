using Microsoft.AspNetCore.Mvc;
using SubTracker.Api.Common;

namespace SubTracker.Api.Controllers;

[ApiController]
public abstract class ApiControllerBase : ControllerBase
{
    protected ActionResult ToActionResult<T>(ServiceResult<T> result) =>
        ToActionResult(result, value => Ok(value));

    protected ActionResult ToActionResult<T>(ServiceResult<T> result, Func<T, ActionResult> onSuccess) =>
        result.Succeeded ? onSuccess(result.Value!) : ToErrorResult(result.Error!);

    private ActionResult ToErrorResult(ServiceError error)
    {
        if (error.Type == ServiceErrorType.Validation && error.ValidationErrors is not null)
        {
            foreach (var (field, messages) in error.ValidationErrors)
            {
                foreach (var message in messages)
                {
                    ModelState.AddModelError(field, message);
                }
            }

            return ValidationProblem(ModelState);
        }

        var statusCode = error.Type switch
        {
            ServiceErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            ServiceErrorType.NotFound => StatusCodes.Status404NotFound,
            ServiceErrorType.Conflict => StatusCodes.Status409Conflict,
            _ => StatusCodes.Status400BadRequest,
        };

        return Problem(detail: error.Message, statusCode: statusCode);
    }
}
