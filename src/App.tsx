import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthorizationContext } from "./Contexts/AuthorizationContext";
import "./App.css";
import LoadingPage from "./Pages/Loading/LoadingPage";
import LandingPage from "./Pages/Landing/LandingPage";
import HomePage from "./Pages/Home/HomePage";
import { withHeader } from "./Components/Header";
import SettingsPage from "./Pages/Settings/SettingsPage";
import AboutPage from "./Pages/About/AboutPage";
import SessionViewerPage from "./Pages/SessionViewer/SessionViewerPage";

const HomePageWithHeader = withHeader(HomePage);
const SettingsPageWithHeader = withHeader(SettingsPage);
const AboutPageWithHeader = withHeader(AboutPage);
const SessionViewerPageWithHeader = withHeader(SessionViewerPage);

function App() {
  const { user, loadingUser } = React.useContext(AuthorizationContext);

  console.log("user");
  console.log(user);

  function getRoutes() {
    if (loadingUser)
      return <Route path="/" element={<LoadingPage text="signing in..." />} />;

    if (!user) return <Route path="/" element={<LandingPage />} />;

    return (
      <>
        <Route path="/" element={<HomePageWithHeader />} />
        <Route path="/Settings" element={<SettingsPageWithHeader />} />
        <Route path="/About" element={<AboutPageWithHeader />} />
        <Route
          path="/Session/:sessionId/*"
          element={<SessionViewerPageWithHeader />}
        />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>{getRoutes()}</Routes>
    </BrowserRouter>
  );
}

export default App;
