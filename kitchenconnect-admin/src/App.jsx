/* eslint-disable no-unused-vars */
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Provider from "./pages/Provider";
import ProtectedRoute from './components/ProtectedRoutes.jsx'
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route exact path="/customer" element={
              <ProtectedRoute>
                <Customer />
              </ProtectedRoute>
            } />
            <Route exact path="/provider" element={
              <ProtectedRoute>
                <Provider />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
