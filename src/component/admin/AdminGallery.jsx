
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";

function AdminGallery() {
  const [plants, setPlants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: "",
    category: "",
    price:"" ||0,
    image: "",
  });

  //  Fetch plants from db.json using json-server
  useEffect(() => {
    axios
      .get("/plants")
      .then((res) => {
        setPlants(res.data);
      })
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  //  Add new plant to db.json
  const handleAddPlant = async () => {
    if (!newPlant.name || !newPlant.image) {
      alert("Please enter both plant name and image URL/path!");
      return;
    }

    const newItem = {
      name: newPlant.name,
      category: newPlant.category || "Plants",
      image: newPlant.image, // can be URL or /images/plant.jpg
    };

    try {
      const response = await axios.post("/plants", newItem);
      setPlants([...plants, response.data]);
      setShowModal(false);
      setNewPlant({ name: "", category: "", image: "" });
      alert(" New plant added successfully!");
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  return (
    <Container className="my-5 text-center">
      <h2 className="text-success mb-4">🌿 Admin Gallery 🌿</h2>

      <Button variant="success" className="mb-4" onClick={() => setShowModal(true)}>
        ➕ Upload New Plant
      </Button>

      <Row className="g-4 justify-content-center">
        {plants.map((plant) => (
          <Col md={4} sm={6} xs={12} key={plant.id}>
            <Card className="shadow-sm border-0">
             

            <Card.Img
  variant="top"
  src={
    plant.image.startsWith("http")
      ? plant.image
      : import.meta.env.BASE_URL + plant.image
  }
  style={{
    height: "250px",
    objectFit: "cover",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  }}
  onError={(e) => {
    e.target.src = import.meta.env.BASE_URL + "images/default.jpg";
  }}
/>






              <Card.Body>
                <Card.Title>{plant.name}</Card.Title>
                <Card.Text className="text-muted">{plant.category}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/*  Modal to Add New Plant */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Plant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Plant Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plant name"
                value={newPlant.name}
                onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Indoor, Outdoor, etc."
                value={newPlant.category}
                onChange={(e) => setNewPlant({ ...newPlant, category: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL or Path</Form.Label>
              <Form.Control
                type="text"
                placeholder="Paste full image URL or /images/plant.jpg"
                value={newPlant.image}
                onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })}
              />
              <Form.Text className="text-muted">
                For example:  
                <br />
                🔗 https://images.pexels.com/photos/1471600/pexels-photo-1471600.jpeg  
                or  
                🖼️ /images/plant5.jpg (inside public/images folder)
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddPlant}>
            Add Plant
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminGallery;
