using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;
using SubTracker.Api.Entities;

namespace SubTracker.Api.Auth;

public class SecurityStampValidationEvents(UserManager<AppUser> userManager) : JwtBearerEvents
{
    public override async Task TokenValidated(TokenValidatedContext context)
    {
        var userId = context.Principal?.FindFirstValue(JwtRegisteredClaimNames.Sub);
        var tokenStamp = context.Principal?.FindFirstValue(AppClaimTypes.SecurityStamp);
        var user = userId is null ? null : await userManager.FindByIdAsync(userId);

        if (user is null || user.SecurityStamp != tokenStamp)
        {
            context.Fail("Token är inte längre giltig.");
        }
    }
}
