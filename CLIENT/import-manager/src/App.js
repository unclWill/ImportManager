import AuthProvider from "./components/context/AuthProvider";
import RegisterRetainedProduct from "./components/view/RegisterRetainedProduct";
import RegisterView from "./components/view/RegisterView";
import RetainedProductsView from "./components/view/RetainedProductsView";

function App() {
  return (
    <div>
      <AuthProvider>
        <RetainedProductsView />
      </AuthProvider>
    </div>
  );
}

export default App;
