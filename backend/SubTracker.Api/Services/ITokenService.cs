using SubTracker.Api.Auth;
using SubTracker.Api.Entities;

namespace SubTracker.Api.Services;

public interface ITokenService
{
    AccessToken CreateToken(AppUser user);
}
