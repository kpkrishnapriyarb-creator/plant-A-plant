
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form, Spinner } from "react-bootstrap";
import "./Gallery.css";

function Gallery() {
  const [plants, setPlants] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/plants")
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching plant data:", error);
        setLoading(false);
      });
  }, []);

  const filteredPlants = plants.filter(
    (plant) =>
      plant.name &&
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visiblePlants = showMore ? filteredPlants : filteredPlants.slice(0, 3);

  return (
    <Container className="my-5 text-center">
      <h2 className="text-success mb-4">🌿 Our Plant Gallery 🌿</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-3">Loading plants...</p>
        </div>
      ) : (
        <>
          {showMore && (
            <Form className="mb-4 w-50 mx-auto">
              <Form.Control
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
          )}

          <Row className="g-4 justify-content-center">
            {visiblePlants.length > 0 ? (
              visiblePlants.map((plant) => (
                <Col key={plant.id} lg={3} md={4} sm={6} xs={12}>
                  <Card className="plant-card shadow-sm border-0">
                    <Card.Img
                      variant="top"
                      src={plant.image}  // ✅ use URL from JSON
                      className="gallery-img"
                    />
                    <Card.Body>
                      <Card.Title className="Heading">{plant.name}</Card.Title>
                       <Card.Text>{plant.description}</Card.Text>
                      
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-muted mt-3">No plants found 🌱</p>
            )}
          </Row>

          {filteredPlants.length > 3 && (
            <div className="text-center mt-4">
              <Button
                variant={showMore ? "secondary" : "success"}
                onClick={() => {
                  setShowMore(!showMore);
                  setSearchTerm("");
                }}
              >
                {showMore ? "Show Less" : "View More"}
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default Gallery;
