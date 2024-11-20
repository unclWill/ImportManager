import axios from "axios";
import { cleanDoc } from "../../utils/Mascaras";
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
    throw error;
  }
}

export { alterById };
