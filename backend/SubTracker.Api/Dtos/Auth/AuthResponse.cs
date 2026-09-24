namespace SubTracker.Api.Dtos.Auth;

public record AuthResponse(string Token, DateTime ExpiresAt, UserResponse User);
