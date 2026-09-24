using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using SubTracker.Api.Auth;
using SubTracker.Api.Entities;

namespace SubTracker.Api.Services;

public class TokenService(IOptions<JwtOptions> options) : ITokenService
{
    private readonly JwtOptions _options = options.Value;
    private readonly JsonWebTokenHandler _tokenHandler = new();

    public AccessToken CreateToken(AppUser user)
    {
        var expiresAt = DateTime.UtcNow.AddMinutes(_options.ExpiresInMinutes);

        var descriptor = new SecurityTokenDescriptor
        {
            Issuer = _options.Issuer,
            Audience = _options.Audience,
            Expires = expiresAt,
            SigningCredentials = new SigningCredentials(_options.CreateSigningKey(), SecurityAlgorithms.HmacSha256),
            Claims = new Dictionary<string, object>
            {
                [JwtRegisteredClaimNames.Sub] = user.Id,
                [JwtRegisteredClaimNames.Email] = user.Email ?? string.Empty,
                [JwtRegisteredClaimNames.Jti] = Guid.NewGuid().ToString(),
                [AppClaimTypes.SecurityStamp] = user.SecurityStamp ?? string.Empty,
            },
        };

        return new AccessToken(_tokenHandler.CreateToken(descriptor), expiresAt);
    }
}
