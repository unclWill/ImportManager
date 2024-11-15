using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ImportManagerAPI.Models.Enums;

[JsonConverter(typeof(StringEnumConverter))]
public enum MovementType
{
    [EnumMember(Value = "Entrada")]
    Entrada,
    [EnumMember(Value = "Saida")]
    Saida
}