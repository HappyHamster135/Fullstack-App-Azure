using SubTracker.Api.Dtos.Auth;
using SubTracker.Api.Entities;

namespace SubTracker.Api.Mappings;

public static class UserMappings
{
    public static UserResponse ToResponse(this AppUser user) => new(user.Id, user.Email ?? string.Empty);
}
