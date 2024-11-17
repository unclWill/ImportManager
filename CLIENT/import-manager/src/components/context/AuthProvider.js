import { createContext, useState } from "react";
import User from "../models/User";
import { loginService } from "../service/AuthService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(new User("", "", "", "", ""));

  async function handleLogin(doc, senha) {
    try {
      const data = await loginService(doc, senha);
      const token = await data.token;

      if (token) {
        const decodedToken = jwtDecode(token);
        const { nameid, unique_name, actort, role } = decodedToken;
        user.id = nameid;
        user.doc = actort;
        user.name = unique_name;
        user.role = role;
        user.token = token;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
