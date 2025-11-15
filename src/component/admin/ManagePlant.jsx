import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";


export default function ManagePlant() {
  const [plants, setPlants] = useState([]);

  const fetchPlants = async () => {
    const res = await axios.get("/plants");
    setPlants(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/plants/${id}`);
    fetchPlants();
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <>
      
      <Container className="mt-4 mb-5">
        <h2 className="text-center text-success mb-4">🌱 Manage Plants</h2>
        <Row>
          {plants.map((p) => (
            <Col md={4} key={p.id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={p.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>₹{p.price}</Card.Text>
                  <Card.Text>{p.category}</Card.Text>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      
    </>
  );
}