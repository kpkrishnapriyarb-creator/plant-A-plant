
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import img1 from "../assets/plant1.jpg";
import img2 from "../assets/plant2.jpg";
import img3 from "../assets/plant3.jpg";

function MorePlants() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const plants = [
    { image: img1, name: "Peace Lily" },
    { image: img2, name: "Snake Plant" },
    { image: img3, name: "Areca Palm" },
    
    
  ];

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5 text-center">
      <h2 className="mb-4">🌿 Our Plant Gallery</h2>

      {/*  Simple visible search input */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          placeholder="Search for a plant..."
          style={{
            width: "50%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Row className="g-4 justify-content-center">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={plant.image}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{plant.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No plants found 🌱</p>
        )}
      </Row>

      <Button variant="primary" className="mt-4" onClick={() => navigate("/")}>
        View More
      </Button>
    </Container>
  );
}

export default MorePlants;