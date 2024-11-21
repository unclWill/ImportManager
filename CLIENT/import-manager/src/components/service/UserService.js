import axios from "axios";
import apiConfig from "../../config/apiConfig";

const URL = apiConfig.baseUrl;

async function alterById(user) {
  const data = {
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    email: user.email,
    role: user.role,
  };

  try {
    const response = await axios.put(`${URL}/users/${user.id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erro na resposta do servidor:", error.response.data);
      throw new Error(error.response.data.message || "Erro ao tentar alterar usuário");
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
      throw new Error("Nenhuma resposta do servidor.");
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
      throw new Error("Erro ao tentar alterar usuário.");
    }
  }
}

export { alterById };
