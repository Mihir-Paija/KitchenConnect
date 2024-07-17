/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Login = () => {
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //functions
  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const bodyData = {
        email,
        password,
      };
      console.log(bodyData);
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
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
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
