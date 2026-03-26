// App.jsx
import "./app.scss";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Success from "./pages/success/Success";
import Pay from "./pages/pay/Pay";
import Profile from "./pages/profile/profile"   // ⭐ NEW
import EditGig from "./pages/editGig/EditGig"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import GigProtectionRoute from "./components/GigProtectionRoute/GigProtectionRoute";

const queryClient = new QueryClient();

function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const Layout = () => (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },

        {
          path: "/gigs",
          element: (
            <ProtectedRoutes>
              <Gigs currentUser={currentUser} />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/myGigs",
          element: (
            <ProtectedRoutes>
              <GigProtectionRoute>
                <MyGigs currentUser={currentUser} />
              </GigProtectionRoute>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/orders",
          element: (
            <ProtectedRoutes>
              <Orders currentUser={currentUser} />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/messages",
          element: (
            <ProtectedRoutes>
              <Messages currentUser={currentUser} />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/message/:id",
          element: (
            <ProtectedRoutes>
              <Message currentUser={currentUser} />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/add",
          element: (
            <ProtectedRoutes>
              <GigProtectionRoute>
                <Add currentUser={currentUser} />
              </GigProtectionRoute>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/gig/:id",
          element: (
            <ProtectedRoutes>
              <Gig currentUser={currentUser} />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <Profile currentUser={currentUser} />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/edit-gig/:id",
          element: (
            <ProtectedRoutes>
              <GigProtectionRoute>
                <EditGig />
              </GigProtectionRoute>
            </ProtectedRoutes>
          ),
        },

        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/pay/:id", element: <Pay currentUser={currentUser} /> },
        { path: "/success", element: <Success currentUser={currentUser} /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
export default App;