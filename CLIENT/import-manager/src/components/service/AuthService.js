import axios from "axios";
import { cleanDoc } from "../../utils/Mascaras";

const URL = "http://meister.app.br:5000";

async function loginService(doc, senha) {
  const data = {
    taxPayerDocument: `${doc}`,
    password: `${senha}`,
  };

  try {
    const response = await axios.post(`${URL}/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error) {
    // Se o erro ocorreu, capture a mensagem do erro
    if (error.response) {
      // O servidor respondeu com um status code que sai do intervalo de 2xx
      console.error("Erro na resposta do servidor:", error.response.data); // Para depuração
      throw new Error(error.response.data.message || "Erro ao fazer login");
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta
      console.error("Erro na requisição:", error.request); // Para depuração
      throw new Error("Nenhuma resposta do servidor.");
    } else {
      // Alguma coisa aconteceu na configuração da requisição que gerou um erro
      console.error("Erro ao configurar a requisição:", error.message); // Para depuração
      throw new Error("Erro ao fazer login.");
    }
  }
}

async function registerService(user) {
  const data = {
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    taxPayerDocument: cleanDoc(user.taxPayerDocument),
    email: user.email,
    role: user.role,
  };

  try {
    const response = await axios.post(`${URL}/users`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error) {
    // Se o erro ocorreu, capture a mensagem do erro
    if (error.response) {
      // O servidor respondeu com um status code que sai do intervalo de 2xx
      console.error("Erro na resposta do servidor:", error.response.data); // Para depuração
      throw new Error(error.response.data.message || "Erro ao fazer login");
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta
      console.error("Erro na requisição:", error.request); // Para depuração
      throw new Error("Nenhuma resposta do servidor.");
    } else {
      // Alguma coisa aconteceu na configuração da requisição que gerou um erro
      console.error("Erro ao configurar a requisição:", error.message); // Para depuração
      throw new Error("Erro ao fazer login.");
    }
  }
}

export { loginService, registerService };
