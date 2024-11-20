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

async function recoverProduct(id, quantity) {
  const data = {
    quantity: 0,
    feePercentage: 0,
    isFinalized: true,
  };

  try {
    const response = await axios.put(
      `${URL}/stock-movements/filter?UserId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
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

export { searchAll, searchAllByUser };
