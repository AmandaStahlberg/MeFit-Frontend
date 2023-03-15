import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/navbar/Navbar";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";
import Dashboard from "./pages/Dashboard";
import Program from "./pages/Program";
import Goal from "./pages/Goal";
import Workout from "./pages/Workout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/goal" element={<Goal />} />

          <Route path="/program" element={<Program />} />

          <Route path="/workout" element={<Workout />} />
          <Route path="/" element={<StartPage />} />
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
