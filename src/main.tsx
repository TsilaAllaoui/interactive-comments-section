import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CommentsProvider from "./providers/CommentsProvider.tsx";
import UserProvider from "./providers/UserProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <CommentsProvider>
        <App />
      </CommentsProvider>
    </UserProvider>
  </React.StrictMode>
);
