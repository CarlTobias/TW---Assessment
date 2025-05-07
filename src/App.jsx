import { Routes, Route } from "react-router-dom";

import PageLayout from "./Layouts/PageLayout/PageLayout";

import LandingPage from "./pages/LandingPage/LandingPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  localStorage.setItem("uid", "LeiBaley");

  return (
    <>
      <Routes>
        <Route path="/wooflesLanding" element={<LandingPage />} />
        <Route path="/wooflesAuth" element={<AuthPage />} />

        <Route element={<PageLayout />}>
          <Route path="/wooflesHome" element={<HomePage />} />
          <Route path="/woofles/:uid" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
