import axios from "axios";
import { cleanDoc } from "../../utils/Mascaras";
import apiConfig from "../../config/apiConfig";

const URL = apiConfig.baseUrl;

async function loginService(doc, senha) {
  const data = {
    taxPayerDocument: `${cleanDoc(doc)}`,
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
    if (error.response) {
      console.error("Erro na resposta do servidor:", error.response.data);
      throw new Error(error.response.data.message || "Erro ao fazer login");
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
      throw new Error("Nenhuma resposta do servidor.");
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
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
    if (error.response) {
      console.error("Erro na resposta do servidor:", error.response.data);
      throw new Error(error.response.data.message || "Usuário já cadastrado.");
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
      throw new Error("Nenhuma resposta do servidor.");
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
      throw new Error("Erro ao fazer login.");
    }
  }
}

export { loginService, registerService };
