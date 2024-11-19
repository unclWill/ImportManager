import axios from "axios";
import apiConfig from "../../config/apiConfig";

const URL = apiConfig.baseUrl;

async function registerProductService(product, token) {
  const data = {
    Name: product.name,
    Description: product.description,
    Quantity: product.quantity,
    Price: product.price,
    Category: product.category,
    OwnerTaxPayerDocument: product.owner,
    feePercentage: product.feePercentage
  };
  try {
    const response = await axios.post(`${URL}/products`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });
    console.log(response);

    return await response.data;
  } catch (error) {
    // Se o erro ocorreu, capture a mensagem do erro
    if (error.response) {
      // O servidor respondeu com um status code que sai do intervalo de 2xx
      console.error("Erro na resposta do servidor:", error.response.data);
      console.error(error); // Para depuração
      throw new Error(
        error.response.data.message || "Erro ao cadastrar o produto."
      );
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta
      console.error("Erro na requisição:", error.request); // Para depuração
      throw new Error("Nenhuma resposta do servidor.");
    } else {
      // Alguma coisa aconteceu na configuração da requisição que gerou um erro
      console.error("Erro ao configurar a requisição:", error.message); // Para depuração
      throw new Error("Erro ao cadastrar o produto.");
    }
  }
}

export { registerProductService };
