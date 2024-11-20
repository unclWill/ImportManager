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
    throw error;
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
    throw error;
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
    throw error;
  }
}

export { searchAll, searchAllByUser, recoverProduct };
