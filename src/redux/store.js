import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cookiesMiddleware, hideErrorWhenRedirect } from "./middlewares";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(thunk, cookiesMiddleware, hideErrorWhenRedirect)
    )
  );

  return store;
}
