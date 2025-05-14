import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PageLayout from "./Layouts/PageLayout/PageLayout";

import LandingPage from "./pages/LandingPage/LandingPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/wooflesLanding" element={<LandingPage />} />
        <Route path="/wooflesAuth" element={<AuthPage />} />

        <Route element={<PrivateRoute />}>
          <Route element={<PageLayout />}>
            <Route path="/wooflesHome" element={<HomePage />} />
            <Route path="/woofles/:uid?" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
