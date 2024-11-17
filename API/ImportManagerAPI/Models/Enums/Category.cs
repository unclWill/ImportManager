using System.Text.Json.Serialization;
using System.Runtime.Serialization;

namespace ImportManagerAPI.Models.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Category
{
    [EnumMember(Value = "Eletrônicos")]
    Eletronicos,
    [EnumMember(Value = "Vestuario")]
    Vestuario,
    [EnumMember(Value = "LinhaBranca")]
    LinhaBranca
}