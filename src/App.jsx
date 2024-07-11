import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import UserManagement from "./pages/UserManagement";
import SendAlert from "./pages/SendAlert";
import AlertMessage from "./pages/AlertMessage";
import Settings from "./pages/Settings";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Navbar><Dashboard /></Navbar>} />
          <Route path="/reports" element={<Navbar><Report /></Navbar>} />
          <Route path="/usermanagement" element={<Navbar><UserManagement /></Navbar>} />
          <Route path="/sendalert" element={<Navbar><SendAlert /></Navbar>} />
          <Route path="/alert-message" element={<Navbar><AlertMessage /></Navbar>} />
          <Route path="/settings" element={<Navbar><Settings /></Navbar>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
