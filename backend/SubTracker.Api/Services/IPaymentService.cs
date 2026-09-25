using SubTracker.Api.Common;
using SubTracker.Api.Dtos.Payments;

namespace SubTracker.Api.Services;

public interface IPaymentService
{
    Task<ServiceResult<List<PaymentResponse>>> GetAllAsync(string userId, int subscriptionId);

    Task<ServiceResult<PaymentResponse>> CreateAsync(string userId, int subscriptionId, PaymentRequest request);

    Task<ServiceResult> DeleteAsync(string userId, int subscriptionId, int paymentId);
}
