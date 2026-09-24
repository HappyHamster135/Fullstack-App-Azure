using Microsoft.AspNetCore.Identity;
using SubTracker.Api.Common;
using SubTracker.Api.Dtos.Auth;
using SubTracker.Api.Entities;
using SubTracker.Api.Mappings;

namespace SubTracker.Api.Services;

public class AuthService(
    UserManager<AppUser> userManager,
    SignInManager<AppUser> signInManager,
    ITokenService tokenService) : IAuthService
{
    private static readonly ServiceError InvalidCredentials =
        ServiceError.Unauthorized("Fel e-post eller lösenord.");

    private static readonly ServiceError LockedOut =
        ServiceError.Unauthorized("För många misslyckade försök. Vänta några minuter och försök igen.");


    //---------------
    //-----Register
    //---------------

    public async Task<ServiceResult<AuthResponse>> RegisterAsync(RegisterRequest request)
    {
        if (await userManager.FindByEmailAsync(request.Email) is not null)
        {
            return ServiceResult<AuthResponse>.Failure(ServiceError.Conflict("E-postadressen är redan registrerad."));
        }

        var user = new AppUser { UserName = request.Email, Email = request.Email };
        var result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return ServiceResult<AuthResponse>.Failure(ServiceError.Validation(ToValidationErrors(result)));
        }

        return ServiceResult<AuthResponse>.Success(CreateAuthResponse(user));
    }


    //---------------
    //-----Login
    //---------------

    public async Task<ServiceResult<AuthResponse>> LoginAsync(LoginRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);

        if (user is null)
        {
            return ServiceResult<AuthResponse>.Failure(InvalidCredentials);
        }

        var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);

        if (result.IsLockedOut)
        {
            return ServiceResult<AuthResponse>.Failure(LockedOut);
        }

        if (!result.Succeeded)
        {
            return ServiceResult<AuthResponse>.Failure(InvalidCredentials);
        }

        return ServiceResult<AuthResponse>.Success(CreateAuthResponse(user));
    }


    //---------------
    //-----Logout
    //---------------

    public async Task LogoutAsync(string userId)
    {
        var user = await userManager.FindByIdAsync(userId);

        if (user is not null)
        {
            await userManager.UpdateSecurityStampAsync(user);
        }
    }


    //---------------
    //-----Current user
    //---------------

    public async Task<ServiceResult<UserResponse>> GetCurrentUserAsync(string userId)
    {
        var user = await userManager.FindByIdAsync(userId);

        return user is null
            ? ServiceResult<UserResponse>.Failure(ServiceError.NotFound("Användaren finns inte."))
            : ServiceResult<UserResponse>.Success(user.ToResponse());
    }


    //---------------
    //-----Helpers
    //---------------

    private AuthResponse CreateAuthResponse(AppUser user)
    {
        var token = tokenService.CreateToken(user);
        return new AuthResponse(token.Value, token.ExpiresAt, user.ToResponse());
    }

    private static Dictionary<string, string[]> ToValidationErrors(IdentityResult result) =>
        result.Errors
            .GroupBy(error => error.Code.StartsWith("Password", StringComparison.Ordinal)
                ? nameof(RegisterRequest.Password)
                : nameof(RegisterRequest.Email))
            .ToDictionary(group => group.Key, group => group.Select(error => error.Description).Distinct().ToArray());
}
