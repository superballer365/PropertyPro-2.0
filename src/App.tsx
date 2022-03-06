import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthorizationContext } from "./Contexts/AuthorizationContext";
import LoadingPage from "./Pages/Loading/LoadingPage";
import LandingPage from "./Pages/Landing/LandingPage";
import HomePage from "./Pages/Home/HomePage";
import Header from "./Components/Header";
import SettingsPage from "./Pages/Settings/SettingsPage";
import AboutPage from "./Pages/About/AboutPage";
import SessionViewerPage from "./Pages/SessionViewer/SessionViewerPage";
import styles from "./App.module.scss";

function App() {
  const { user, loadingUser } = React.useContext(AuthorizationContext);

  return (
    <BrowserRouter>
      {loadingUser ? (
        <LoadingPage text="signing in..." />
      ) : user ? (
        <div className={styles.container}>
          <Header />
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Settings" element={<SettingsPage />} />
              <Route path="/About" element={<AboutPage />} />
              <Route
                path="/Session/:sessionId/*"
                element={<SessionViewerPage />}
              />
            </Routes>
          </div>
        </div>
      ) : (
        <LandingPage />
      )}
    </BrowserRouter>
  );
}

export default App;
