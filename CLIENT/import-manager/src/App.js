import AuthProvider from "./components/context/AuthProvider";
import Navigation from "./components/router/Navigation";

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
