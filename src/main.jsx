import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router"; // ✅ Corrected import
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./context/AuthProvider.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";

import Root from "./layout/Root.jsx"; 
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import AvailableFoods from "./pages/AvailableFoods.jsx";
import AddFood from "./pages/AddFood.jsx";
import ManageFoods from "./pages/ManageFoods.jsx";
import MyFoodRequest from "./pages/MyFoodRequest.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // ✅ Now Root is defined
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "/available-foods", element: <AvailableFoods /> },
      {
        path: "add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageFoods/>
          </PrivateRoute>
        ),
      },
      {
        path: "my-food-requests",
        element: (
          <PrivateRoute>
            <MyFoodRequest/>
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
