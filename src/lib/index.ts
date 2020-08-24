import { combineReducers, compose, applyMiddleware, createStore } from "redux";
import { userReducer } from "./reducers/userReducer";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from "./actions/ActionTypes";
import { composeWithDevTools } from "redux-devtools-extension";
import { courseReducer } from "./reducers/courseReducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const combinedReducers = combineReducers({
  userModel: userReducer,
  courseModel: courseReducer,
});

export type AppState = ReturnType<typeof combinedReducers>;

const bind = (middleware: any[]): any => {
  return composeWithDevTools(applyMiddleware(...middleware));
};

export default createStore(
  combinedReducers,
  bind([thunk as ThunkMiddleware<AppState, AppActions>])
);
