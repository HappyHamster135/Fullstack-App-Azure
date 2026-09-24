using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using SubTracker.Api.Data;

var builder = WebApplication.CreateBuilder(args);


//---------------
//-----Database
//---------------

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException(
        "Connection string 'DefaultConnection' saknas. Lokalt sätts den med dotnet user-secrets (se README.md).");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString, sql => sql.EnableRetryOnFailure()));


//---------------
//-----CORS
//---------------

const string FrontendCorsPolicy = "Frontend";
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];

builder.Services.AddCors(options =>
    options.AddPolicy(FrontendCorsPolicy, policy => policy
        .WithOrigins(allowedOrigins)
        .AllowAnyHeader()
        .AllowAnyMethod()));


//---------------
//-----Services
//---------------

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddHealthChecks().AddDbContextCheck<AppDbContext>();


//---------------
//-----Startup
//---------------

var app = builder.Build();

if (allowedOrigins.Length == 0)
{
    app.Logger.LogWarning("Cors:AllowedOrigins är tom – ingen frontend kan anropa API:t.");
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    try
    {
        await db.Database.MigrateAsync();
    }
    catch (Exception ex)
    {
        app.Logger.LogCritical(ex, "Kunde inte migrera databasen. Kontrollera connection string och brandväggen i Azure SQL.");
    }
}


//---------------
//-----Middleware
//---------------

app.UseHttpsRedirection();
app.UseCors(FrontendCorsPolicy);
app.UseAuthorization();


//---------------
//-----Endpoints
//---------------

app.MapOpenApi();
app.MapScalarApiReference(options => options.WithTitle("SubTracker API"));

app.MapControllers();
app.MapHealthChecks("/api/health");
app.MapGet("/", () => Results.Redirect("/scalar")).ExcludeFromDescription();

app.Run();
