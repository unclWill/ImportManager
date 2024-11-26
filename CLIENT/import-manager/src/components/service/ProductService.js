import axios from "axios";
import apiConfig from "../../config/apiConfig";

const URL = apiConfig.baseUrl;

async function searchAll(doc, token) {
  try {
    const response = await axios.get(
      `${URL}/stock-movements/filter?IsFinalized=false`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return await response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erro na resposta do servidor:", error.response.data);
      throw new Error(error.response.data.message || "Erro ao buscar todos os produtos");
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
      throw new Error("Nenhuma resposta do servidor.");
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
      throw new Error("Erro ao buscar produtos.");
    }
  }
}

async function searchAllByUser(id, token) {
  try {
    const response = await axios.get(
      `${URL}/stock-movements/filter?TaxPayerDocument=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return await response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erro na resposta do servidor:", error.response.data);
      throw new Error(error.response.data.message || "Erro ao buscar produtos por usuario");
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
      throw new Error("Nenhuma resposta do servidor.");
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
      throw new Error("Erro ao buscar produtos.");
    }
  }
}

async function searchByProductName(name, token) {
  try {
    const response = await axios.get(
      `${URL}/stock-movements/filter?ProductName=${name}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return await response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erro na resposta do servidor:", error.response.data);
      throw new Error(error.response.data.message || "Erro ao buscar produtos por nome");
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
      throw new Error("Nenhuma resposta do servidor.");
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
      throw new Error("Erro ao buscar produtos.");
    }
  }
}

async function searchByProductNamebyUserId(name, id, token) {
  try {
    const response = await axios.get(
      `${URL}/stock-movements/filter?ProductName=${name}&UserId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return await response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erro na resposta do servidor:", error.response.data);
      throw new Error(error.response.data.message || "Erro ao buscar produtos por nome e id");
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
      throw new Error("Nenhuma resposta do servidor.");
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
      throw new Error("Erro ao buscar produtos.");
    }
  }
}

async function recoverProduct(id, quantity, feePercentage, token) {
  const data = {
    quantity: quantity,
    feePercentage: feePercentage,
    isFinalized: true,
  };

  try {
    const response = await axios.put(`${URL}/stock-movements/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erro na resposta do servidor:", error.response.data);
      throw new Error(error.response.data.message || "Erro ao recuperar produtos");
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
      throw new Error("Nenhuma resposta do servidor.");
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
      throw new Error("Erro ao recuperar produto.");
    }
  }
}

export {
  searchAll,
  searchAllByUser,
  recoverProduct,
  searchByProductName,
  searchByProductNamebyUserId,
};
