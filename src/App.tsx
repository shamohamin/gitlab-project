import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Connector from "./Connector";
import store from "./lib/index";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Connector />
      </Provider>
    </div>
  );
}

export default App;
