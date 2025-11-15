import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Fetch existing users
      const res = await axios.get("http://localhost:5000/users");
      const users = res.data;

      // Check if username already exists
      const alreadyUser = users.find((u) => u.username === username);

      if (alreadyUser) {
        setError("⚠ Username already exists. Please login.");
        return;
      }

      // Create new user (without email)
      const newUser = { username, password };

      // Save new user to JSON Server
      await axios.post("http://localhost:5000/users", newUser);

      alert("✅ Registration successful! Please login.");
      navigate("admin/login");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: "350px", borderRadius: "15px" }}>
        <h3 className="text-center text-success mb-3">🌱 Register Account</h3>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>AdminUsername</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {error && <p className="text-danger small">{error}</p>}

          <Button variant="success" type="submit" className="w-100">
            Register
          </Button>

          <div className="text-center mt-3">
            <small>
              Already have an account?{" "}
              <Link to="/admin/login" className="text-success fw-bold">
                Login here
              </Link>
            </small>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
