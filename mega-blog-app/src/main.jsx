import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Toaster from "./UI";
import { Provider } from "react-redux";
import store from "./Redux/store/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </Provider>
);
