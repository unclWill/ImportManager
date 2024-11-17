import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/context/AuthProvider";
import Navigation from "./components/router/Navigation";
import LoginView from "./components/view/LoginView";
import RegisterRetainedProduct from "./components/view/RegisterRetainedProduct";
import RegisterView from "./components/view/RegisterView";
import RetainedProductsView from "./components/view/RetainedProductsView";

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
