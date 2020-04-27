import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import VotingsPage from "./votings";
import AdminPage from "./admin";
import LoginPage from "./login";
import MePage from "./me";
import SignupPage from "./signup";
import ForgotPage from "./forgot";
import ResetPasswordPage from "./reset";

function App() {
  return (
    <main role="main">
      <Switch>
        <Route path="/votings" component={VotingsPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/me" component={MePage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/signup/:token" component={SignupPage} exact />
        <Route path="/forgot" component={ForgotPage} exact />
        <Route path="/reset/:token" component={ResetPasswordPage} exact />
        <Redirect to="/votings" />
      </Switch>
    </main>
  );
}

export default App;
