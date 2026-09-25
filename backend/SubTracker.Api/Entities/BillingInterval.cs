using System.Text.Json.Serialization;

namespace SubTracker.Api.Entities;

[JsonConverter(typeof(JsonStringEnumConverter<BillingInterval>))]
public enum BillingInterval
{
    Weekly,
    Monthly,
    Quarterly,
    Yearly,
}
