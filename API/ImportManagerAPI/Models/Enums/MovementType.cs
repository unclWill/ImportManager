using System.Text.Json.Serialization;
using System.Runtime.Serialization;

namespace ImportManagerAPI.Models.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum MovementType
{
    [EnumMember(Value = "Entrada")]
    Entrada,
    [EnumMember(Value = "Saida")]
    Saida
}