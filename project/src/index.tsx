// src/index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Onboarding } from "./screens/Onboarding";
import { Login } from "./screens/Auth/Login";
import { Register } from "./screens/Auth/Register";
import { Dashboard } from "./screens/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ui/ProtectedRoute";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add more protected routes here */}
          </Route>
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);