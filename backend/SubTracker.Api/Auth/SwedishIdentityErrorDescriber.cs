using Microsoft.AspNetCore.Identity;

namespace SubTracker.Api.Auth;

public class SwedishIdentityErrorDescriber : IdentityErrorDescriber
{
    //---------------
    //-----User
    //---------------

    public override IdentityError DuplicateEmail(string email) =>
        Error(nameof(DuplicateEmail), "E-postadressen är redan registrerad.");

    public override IdentityError DuplicateUserName(string userName) =>
        Error(nameof(DuplicateUserName), "E-postadressen är redan registrerad.");

    public override IdentityError InvalidEmail(string? email) =>
        Error(nameof(InvalidEmail), "Ange en giltig e-postadress.");

    public override IdentityError InvalidUserName(string? userName) =>
        Error(nameof(InvalidUserName), "E-postadressen innehåller otillåtna tecken.");


    //---------------
    //-----Password
    //---------------

    public override IdentityError PasswordTooShort(int length) =>
        Error(nameof(PasswordTooShort), $"Lösenordet måste vara minst {length} tecken.");

    public override IdentityError PasswordRequiresDigit() =>
        Error(nameof(PasswordRequiresDigit), "Lösenordet måste innehålla minst en siffra.");

    public override IdentityError PasswordRequiresLower() =>
        Error(nameof(PasswordRequiresLower), "Lösenordet måste innehålla minst en liten bokstav.");

    public override IdentityError PasswordRequiresUpper() =>
        Error(nameof(PasswordRequiresUpper), "Lösenordet måste innehålla minst en stor bokstav.");

    public override IdentityError PasswordRequiresNonAlphanumeric() =>
        Error(nameof(PasswordRequiresNonAlphanumeric), "Lösenordet måste innehålla minst ett specialtecken.");

    public override IdentityError PasswordRequiresUniqueChars(int uniqueChars) =>
        Error(nameof(PasswordRequiresUniqueChars), $"Lösenordet måste innehålla minst {uniqueChars} olika tecken.");


    //---------------
    //-----Helpers
    //---------------

    private static IdentityError Error(string code, string description) =>
        new() { Code = code, Description = description };
}
