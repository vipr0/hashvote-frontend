import React from "react";
import { Switch, Route } from "react-router-dom";
import VotingsList from "../../components/VotingsList";
import VotingDetails from "../../components/VotingDetails";
import "./style.css";
import PageLayout from "../../components/PageLayout";

const VotingsPage = ({ match }) => {
  return (
    <PageLayout>
      <Switch>
        <Route path={`${match.url}/`} component={VotingsList} exact />
        <Route
          path={`${match.url}/:votingId`}
          component={VotingDetails}
          exact
        />
      </Switch>
    </PageLayout>
  );
};

export default VotingsPage;
