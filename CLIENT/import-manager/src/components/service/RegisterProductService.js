import axios from "axios";
import apiConfig from "../../config/apiConfig";
import { parsePriceToDatabase } from "../../utils/Mascaras";

const URL = apiConfig.baseUrl;

async function registerProductService(product, token) {
  const data = {
    Name: product.name,
    Description: product.description,
    Quantity: product.quantity,
    Price: parsePriceToDatabase(product.price),
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

    if (error.response) {

      console.error("Erro na resposta do servidor:", error.response.data);
      console.error(error);
      throw new Error(
        error.response.data.message || "Erro ao cadastrar o produto."
      );
    } else if (error.request) {

      console.error("Erro na requisição:", error.request);
      throw new Error("Nenhuma resposta do servidor.");
    } else {

      console.error("Erro ao configurar a requisição:", error.message);
      throw new Error("Erro ao cadastrar o produto.");
    }
  }
}

export { registerProductService };
