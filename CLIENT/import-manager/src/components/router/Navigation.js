import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./../view/LoginView";
import RegisterView from "./../view/RegisterView";
import RegisterRetainedProduct from "./../view/RegisterRetainedProduct";
export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginView />} />
        <Route path="user/cadastro" element={<RegisterView />} />
        <Route path="produto/cadastro" element={<RegisterRetainedProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
