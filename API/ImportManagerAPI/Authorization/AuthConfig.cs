using System.Text.Json;

namespace ImportManagerAPI.Authorization;

public class AuthConfig
{
    public string PrivateKey { get; set; } = "";
    
    public static AuthConfig Instance { get; private set; }
    
    static AuthConfig()
    {
        var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "secrets.json");
        if (File.Exists(path))
        {
            try
            {
                var jsonContent = File.ReadAllText(path);
                Instance = JsonSerializer.Deserialize<AuthConfig>(jsonContent) 
                           ?? throw new Exception("Erro ao desserializar o arquivo secrets.json.");
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao carregar a configuração de autenticação.", ex);
            }
        }
        else
        {
            throw new FileNotFoundException($"O arquivo de configuração 'secrets.json' não foi encontrado no caminho: {path}");
        }
    }
}
