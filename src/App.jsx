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
import keycloak from "./keycloak";

function App() {
  return (
    <BrowserRouter>
      {keycloak.authenticated ? (
        <>
          <Navbar />
          <main className="container">
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<StartPage />} />
              <Route path="/goal" element={<Goal />} />

              <Route path="/program" element={<Program />} />

              <Route path="/workout" element={<Workout />} />
              <Route
                path="/profile"
                element={
                  // <KeycloakRoute role={ROLES.User}>
                    <ProfilePage />
                  // </KeycloakRoute>
                }
              />
            </Routes>
          </main>
        </> 
      ) : (

      <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
