import React, { useEffect } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import "./App.css";
import { getCurrentUser } from "../../redux/actions/profile";
import { Login, SignUp, ResetPassword, ForgotPassword } from "../AuthForms";
import VotingsList from "../VotingsList";
import VotingDetails from "../VotingDetails";
import PageLayout from "../PageLayout";
import MyProfile from "../MyProfile";
import VotingEditor from "../VotingEditor";
import AdminDashboard from "../AdminDashboard";
import UserEditor from "../UserEditor";
import ErrorBoundry from "../ErrorBoundry";
import Loader from "../Loader";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(({ profile }) => profile.loading);
  const appMessage = useSelector(({ app }) => app.message);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    if (appMessage.type) message[appMessage.type](appMessage.message);
  }, [appMessage]);

  if (loading) return <Loader loading={true} />;

  return (
    <PageLayout>
      <ErrorBoundry>
        <Switch>
          <Route path="/votings" component={VotingsList} exact />
          <Route path="/votings/:votingId" component={VotingDetails} exact />
          <Route path="/me" exact component={MyProfile} />
          <Route path="/admin" component={AdminDashboard} exact />
          <Route
            path="/admin/votings/:votingId"
            component={VotingEditor}
            exact
          />
          <Route path="/admin/users/:userId" component={UserEditor} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup/:token" component={SignUp} exact />
          <Route path="/forgot" component={ForgotPassword} exact />
          <Route path="/reset/:token" component={ResetPassword} exact />
          <Redirect to="/votings" />
        </Switch>
      </ErrorBoundry>
    </PageLayout>
  );
};

export default App;
