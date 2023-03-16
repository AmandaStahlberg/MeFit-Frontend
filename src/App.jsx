import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import StartPage from "./pages/StartPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/navbar/Navbar";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";
import Dashboard from "./pages/Dashboard";
import Program from "./pages/ProgramPage";
import Goal from "./pages/GoalPage";
import Workout from "./pages/WorkoutPage";
import keycloak from "./keycloak";
import Exercise from "./pages/ExercisePage";
import Users from "./pages/UsersPage";
import User from "./pages/UsersPage";

function App() {
  console.log(keycloak.authenticated);
  return (
    <BrowserRouter>
      {keycloak.authenticated ? (
        <>
          <Navbar />
          <main className="container bg-stone-50">
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route exact path="/" element={<Dashboard />} />

              <Route path="/goal" element={<Goal />} />

              <Route path="/program" element={<Program />} />

              <Route path="/workout" element={<Workout />} />
              <Route path="/exercise" element={<Exercise />} />
              <Route
                path="/users"
                element={
                  <KeycloakRoute role={ROLES.Admin}>
                    <User />
                  </KeycloakRoute>
                }
              />
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
          <Route exact path="/" element={<StartPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
