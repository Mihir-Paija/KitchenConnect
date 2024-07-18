/* eslint-disable no-unused-vars */
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Provider from "./pages/Provider";
import ProtectedRoute from './components/ProtectedRoutes.jsx'
import Tiffin from "./pages/Tiffin.jsx";
import TiffinMenuList from "./pages/TiffinMenuList.jsx";
import Subscription from "./pages/Subscription";

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
            <Route exact path="/provider/:providerEmail" element={
              <ProtectedRoute>
                <Provider />
              </ProtectedRoute>
            } />
            <Route exact path="/tiffin" element={
              <ProtectedRoute>
                <Tiffin />
              </ProtectedRoute>
            } />
            <Route exact path="/tiffin/:tiffinID" element={
              <ProtectedRoute>
                <Tiffin />
              </ProtectedRoute>
            } />
            <Route exact path="/subscription" element={
              <ProtectedRoute>
                <Subscription />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
