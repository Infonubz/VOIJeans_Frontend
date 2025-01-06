import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./Store"; // Assuming index.js in Store folder exports rootReducer
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
