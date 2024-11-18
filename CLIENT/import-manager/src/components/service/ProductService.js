import axios from "axios";
const URL = "http://meister.app.br:5000";

async function searchAll() {
  try {
    const response = await axios.get(
      `${URL}/stock-movements/filter?IsFinalized=false`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.data;
  } catch (error) {
    throw error;
  }
}

export { searchAll };
