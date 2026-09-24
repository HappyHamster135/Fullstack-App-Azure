using SubTracker.Api.Common;
using SubTracker.Api.Dtos.Auth;

namespace SubTracker.Api.Services;

public interface IAuthService
{
    Task<ServiceResult<AuthResponse>> RegisterAsync(RegisterRequest request);

    Task<ServiceResult<AuthResponse>> LoginAsync(LoginRequest request);

    Task LogoutAsync(string userId);

    Task<ServiceResult<UserResponse>> GetCurrentUserAsync(string userId);
}
