import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./../view/LoginView";
import RegisterView from "./../view/RegisterView";
import RegisterRetainedProduct from "./../view/RegisterRetainedProduct";
import RetainedProductsView from "../view/RetainedProductsView";
import Splash from "../view/Splash";
export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginView />} />
        <Route path="user/cadastro" element={<RegisterView />} />
        <Route path="produtos/cadastro" element={<RegisterRetainedProduct />} />
        <Route path="produtos/lista" element={<RetainedProductsView />} />
        <Route path="loading" element={<Splash />} />
      </Routes>
    </BrowserRouter>
  );
}
