import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import VotingsPage from "./votings";
import AdminPage from "./admin";
import LoginPage from "./login";
import MePage from "./me";

function App() {
  return (
    <main role="main">
      <Switch>
        <Route path="/votings" component={VotingsPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/me" component={MePage} exact />
        <Redirect to="/votings" />
      </Switch>
    </main>
  );
}

export default App;
