import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";

const renderFromServer = (state = false, action) => {
  switch (action.type) {
    case "SET_SERVER_RENDER_FLAG_TRUE":
      return true;
    case "SET_SERVER_RENDER_FLAG_FALSE":
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  renderFromServer,
  routing
});
