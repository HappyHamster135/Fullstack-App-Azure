namespace SubTracker.Api.Common;

public record ServiceError(
    ServiceErrorType Type,
    string Message,
    IReadOnlyDictionary<string, string[]>? ValidationErrors = null)
{
    public static ServiceError Validation(IReadOnlyDictionary<string, string[]> errors) =>
        new(ServiceErrorType.Validation, "En eller flera uppgifter är ogiltiga.", errors);

    public static ServiceError Unauthorized(string message) => new(ServiceErrorType.Unauthorized, message);

    public static ServiceError NotFound(string message) => new(ServiceErrorType.NotFound, message);

    public static ServiceError Conflict(string message) => new(ServiceErrorType.Conflict, message);
}
