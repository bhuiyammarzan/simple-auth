import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
