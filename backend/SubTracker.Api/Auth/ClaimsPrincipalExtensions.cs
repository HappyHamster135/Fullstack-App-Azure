using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;

namespace SubTracker.Api.Auth;

public static class ClaimsPrincipalExtensions
{
    public static string GetUserId(this ClaimsPrincipal principal) =>
        principal.FindFirstValue(JwtRegisteredClaimNames.Sub)
        ?? throw new InvalidOperationException("Användar-id saknas i token.");
}
