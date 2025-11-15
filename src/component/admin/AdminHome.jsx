import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";



function AdminHome() {
  const navigate = useNavigate();

  return (
    <Container className="admin-home mt-5">
      <h2 className="text-center mb-4 text-success">
        🌱 Welcome, Admin 🌱
      </h2>
      <p className="text-center text-muted mb-5">
        Manage your plant store — update, add, or remove plants easily.
      </p>

      <Row className="g-4 justify-content-center">
        <Col md={4} sm={6}>
          <Card className="shadow-sm admin-card border-0 text-center">
            <Card.Body>
              <h5>Add New Plant</h5>
              <p>Add new plants to your online shop.</p>
              <Button variant="success" onClick={() => navigate("/admin/add")}>
                Add Plant
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={6}>
          <Card className="shadow-sm admin-card border-0 text-center">
            <Card.Body>
              <h5>Manage Stock</h5>
              <p>Update quantity and price of available plants.</p>
              <Button variant="success" onClick={() => navigate("/admin/manage")}>
                Manage
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={6}>
          <Card className="shadow-sm admin-card border-0 text-center">
            <Card.Body>
              <h5>View Orders</h5>
              <p>Check customer orders and status updates.</p>
              <Button variant="success" onClick={() => navigate("/admin/vieworder")}>
                View Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center mt-5">
        <Button variant="secondary" onClick={() => navigate("/login")}>
          Logout
        </Button>
        
      </div>
    </Container>
  );
}

export default AdminHome;