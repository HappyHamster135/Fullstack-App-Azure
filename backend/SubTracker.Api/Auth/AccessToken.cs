namespace SubTracker.Api.Auth;

public record AccessToken(string Value, DateTime ExpiresAt);
