import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import { Provider } from "react-redux";
import App from "./components/App/App";
import configureStore from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
