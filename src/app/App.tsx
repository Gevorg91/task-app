import React from "react";
import { AppRoutes } from "./Routes";
import { Provider } from "react-redux";
import store from "../store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
