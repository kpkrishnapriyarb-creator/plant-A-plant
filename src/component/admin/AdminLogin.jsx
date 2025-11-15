import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";

 function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get("http://localhost:5000/admin");
      const validUser = res.data.find(
        (u) => u.username === username && u.password === password
      );

      if (validUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        alert("✅ User Login Successful!");
        navigate("/admin/home"); // redirect to user home (change route if needed)
      } else {
        setError(" Invalid username or password. Please register first.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: "350px", borderRadius: "15px" }}>
        <h3 className="text-center text-success mb-3">🌿 Admin Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Adminname</Form.Label>
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
            Login
          </Button>

          <div className="text-center mt-3">
            <small>
              Don’t have an account?{" "}
              <Link to="/admin/register" className="text-success fw-bold">
                Register here
              </Link>
            </small>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
export default AdminLogin