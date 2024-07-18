/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {login} from '../services/authService'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  //state
  const [adminID, setAdminID] = useState("");
  const [password, setPassword] = useState("");
  const { authSate, setAuthState } = useAuth();
  const navigate = useNavigate();

  //functions
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const bodyData = {
        id : adminID,
        password,
      };
      console.log(bodyData);
      const response = await login(bodyData);
      if(response && response.status === 200){
        console.log(response)
        document.cookie = `Session=${response.data.authToken}; path=/; SameSite=None; Secure`;
        setAuthState(response.data.authToken)
        navigate('/');
            
      } else{
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12}>
          <h1 className="text-center mb-3">Admin Login</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Admin ID</Form.Label>
              <Form.Control
                type="adminID"
                value={adminID}
                placeholder="Enter adminID"
                onChange={(e) => setAdminID(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
