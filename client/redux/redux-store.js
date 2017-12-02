import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "../../reducers";

const enhancer = compose(
  applyMiddleware(thunk),
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.devToolsExtension
    ? window.devToolsExtension()
    : f => f
);

export default initialState => {
  return createStore(reducer, initialState, enhancer);
};
