/* eslint-disable no-unused-vars */
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Provider from "./pages/Provider";
import Subscription from "./pages/Subscription";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/customer" element={<Customer />} />
            <Route exact path="/provider" element={<Provider />} />
            <Route exact path="/subscription" element={<Subscription />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
