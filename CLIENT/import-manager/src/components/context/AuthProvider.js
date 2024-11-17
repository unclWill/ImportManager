import { createContext, useState } from "react";
import User from "../models/User";
import { Alert } from "antd";
import { loginService } from "../service/AuthService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    new User("", "testando", "111.111.111-11", "", "")
  );

  async function handleLogin(doc, senha, isVitima) {
    try {
      const data = await loginService(doc, senha, isVitima);
      const token = data.token;

      if (token) {
        const decodedToken = jwtDecode(token);
        const { nameid, unique_name, FirstName, role } = decodedToken;
        user.id = nameid;
        user.name = FirstName;
        user.doc = unique_name;
        user.role = role;
        user.token = token;
      }
    } catch (error) {
      Alert(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
