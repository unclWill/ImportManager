using System.Text.Json.Serialization;
using System.Runtime.Serialization;

namespace ImportManagerAPI.Models.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Role
{
    [EnumMember(Value = "Admin")]
    Admin,
    [EnumMember(Value = "TaxPayer")]
    TaxPayer
}