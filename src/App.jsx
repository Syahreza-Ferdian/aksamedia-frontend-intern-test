import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Auth/Login";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Dashboard/Navbar";
import { AuthProvider, useAuth } from "./Auth/AuthProvider";
import ThemeProvider from "./Helper/ThemeProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <Dashboard />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;