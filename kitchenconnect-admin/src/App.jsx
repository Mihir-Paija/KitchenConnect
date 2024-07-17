/* eslint-disable no-unused-vars */
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Provider from "./pages/Provider";

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
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
