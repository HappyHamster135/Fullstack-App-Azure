using SubTracker.Api.Dtos.Dashboard;

namespace SubTracker.Api.Services;

public interface IDashboardService
{
    Task<DashboardResponse> GetAsync(string userId);
}
