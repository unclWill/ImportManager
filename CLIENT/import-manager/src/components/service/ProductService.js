import axios from "axios";

async function searchAll(doc, token) {
  const data = {
    taxPayerDocument: doc,
  };

  try {
    const response = await axios.post(
      `${URL}/stock-movements/by-taxpayer/${doc}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.data;
  } catch (error) {
    throw error;
  }
}

export { searchAll };
