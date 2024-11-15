using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace ImportManagerAPI.Models.Enums;

[JsonConverter(typeof(StringEnumConverter))]
public enum Role
{
    [EnumMember(Value = "Admin")]
    Admin,
    [EnumMember(Value = "TaxPayer")]
    TaxPayer
}