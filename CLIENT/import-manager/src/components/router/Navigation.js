import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./../view/LoginView";
import RegisterView from "./../view/RegisterView";
export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginView />} />
        <Route path="cadastro" element={<RegisterView />} />
      </Routes>
    </BrowserRouter>
  );
}
