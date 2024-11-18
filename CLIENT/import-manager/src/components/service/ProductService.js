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

async function searchAllByUser(id) {
  try {
    const response = await axios.get(
      `${URL}/stock-movements/filter?UserId=${id}`,
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

async function recoverProduct(id) {
  const data = {
    isFinalized: true,
  };

  try {
    const response = await axios.put(
      `${URL}/stock-movements/filter?UserId=${id}`,
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

export { searchAll, searchAllByUser };
