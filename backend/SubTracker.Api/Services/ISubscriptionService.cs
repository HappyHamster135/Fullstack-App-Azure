using SubTracker.Api.Common;
using SubTracker.Api.Dtos.Subscriptions;

namespace SubTracker.Api.Services;

public interface ISubscriptionService
{
    Task<List<SubscriptionResponse>> GetAllAsync(string userId);

    Task<ServiceResult<SubscriptionResponse>> GetByIdAsync(string userId, int id);

    Task<ServiceResult<SubscriptionResponse>> CreateAsync(string userId, SubscriptionRequest request);

    Task<ServiceResult<SubscriptionResponse>> UpdateAsync(string userId, int id, SubscriptionRequest request);

    Task<ServiceResult> DeleteAsync(string userId, int id);
}
