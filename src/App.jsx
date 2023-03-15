import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import EditProductPage from "./pages/EditProductPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/navbar/Navbar";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<EditProductPage />} />
          <Route
            path="/profile"
            element={
              <KeycloakRoute role={ ROLES.User }>
                <ProfilePage />
              </KeycloakRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
