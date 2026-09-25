using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SubTracker.Api.Auth;
using SubTracker.Api.Dtos.Dashboard;
using SubTracker.Api.Services;

namespace SubTracker.Api.Controllers;

[Authorize]
[Route("api/dashboard")]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class DashboardController(IDashboardService dashboardService) : ApiControllerBase
{
    [HttpGet]
    [ProducesResponseType<DashboardResponse>(StatusCodes.Status200OK)]
    public async Task<ActionResult<DashboardResponse>> Get() =>
        Ok(await dashboardService.GetAsync(User.GetUserId()));
}
