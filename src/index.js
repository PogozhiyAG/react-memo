import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { LeaderboardContextProvider } from "./context/LeaderboardContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LeaderboardContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </LeaderboardContextProvider>
  </React.StrictMode>,
);
