import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cookiesMiddleware, hideErrorWhenRedirect } from "./middlewares";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        // routerMiddleware(history),
        thunk,
        cookiesMiddleware,
        hideErrorWhenRedirect
      )
    )
  );

  return store;
}
