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
import LoadingComponent from "./components/loadingComponent";
import LandingPage from "./pages/Landing";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path = "/" element ={<LandingPage />} />
            <Route exact path="/login" element={<Login />} />
<<<<<<< HEAD
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/customer" element={<Customer />} />
            <Route exact path="/provider" element={<Provider />} />
            <Route exact path="/subscription" element={<Subscription />} />
=======
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
>>>>>>> b82b2a9ce0b4780ec10d2722fa9d6b76b16ccc72
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
