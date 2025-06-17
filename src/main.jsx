import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
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
import FoodDetails from "./pages/FoodDetails.jsx";

// React Query imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create QueryClient instance
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "/available-foods", element: <AvailableFoods /> },
      { path:"/food-details/:id", element:<FoodDetails />},

      {
        path: "add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-foods",
        element: (
          <PrivateRoute>
            <ManageFoods/>
          </PrivateRoute>
        ),
      },
      {
        path: "/requested-foods",
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
