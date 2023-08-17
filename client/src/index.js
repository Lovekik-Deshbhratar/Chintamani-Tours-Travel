import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import { NotificationProvider } from "./Context/NotificationContext";
import { EmailAuthContextProvider } from "./Context/EmailAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <AuthContextProvider>
        <EmailAuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </EmailAuthContextProvider>
      </AuthContextProvider>
    </NotificationProvider>
  </React.StrictMode>
);
