import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AuthorizationContext } from "./Contexts/AuthorizationContext";
import "./App.css";
import LoadingPage from "./Pages/Loading/LoadingPage";
import LandingPage from "./Pages/Landing/LandingPage";
import HomePage from "./Pages/Home/HomePage";
import { withHeader } from "./Components/Header";
import SettingsPage from "./Pages/Settings/SettingsPage";
import AboutPage from "./Pages/About/AboutPage";
import SessionViewerPage from "./Pages/SessionViewer/SessionViewerPage";

function App() {
  const { user, loadingUser } = React.useContext(AuthorizationContext);

  console.log("user");
  console.log(user);

  function getRoutes() {
    if (loadingUser)
      return (
        <Route
          path="/"
          component={() => <LoadingPage text="signing in..." />}
        />
      );

    if (!user) return <Route path="/" component={LandingPage} />;

    return (
      <>
        <Route path="/" exact component={withHeader(HomePage)} />
        <Route path="/Settings" component={withHeader(SettingsPage)} />
        <Route path="/About" component={withHeader(AboutPage)} />
        <Route
          path="/Session/:sessionId"
          exact
          component={withHeader(SessionViewerPage)}
        />
      </>
    );
  }

  return <Router>{getRoutes()}</Router>;
}

export default App;
