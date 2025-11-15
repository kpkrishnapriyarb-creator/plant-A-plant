
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Card } from "react-bootstrap";

export default function AddPlant() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: "", 
  });
// Update only the input field that changed,
// while keeping the rest of formData the same
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });//update the change filed
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/plants");
      const plants = res.data;
      const newId = (plants.length + 1).toString();

      const newPlant = { id: newId, ...formData, rating: parseFloat(formData.rating) }; // ensure number
      await axios.post("http://localhost:5000/plants", newPlant);

      alert("✅ Plant added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding plant");
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Card className="p-4 shadow-lg border-0">
        <h3 className="text-center mb-4 text-success">🌱 Add New Plant</h3>
        <Form onSubmit={handleAdd}>
          <Form.Group className="mb-3">
            <Form.Label>Plant Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter plant name"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter price"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter description"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder="Enter category"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              placeholder="Enter image URL"
              onChange={handleChange}
              required
            />
          </Form.Group>

          
          <Form.Group className="mb-3">
            <Form.Label>Rating (0 - 5)</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              placeholder="Enter rating"
              min="0"
              max="5"
              step="0.1"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="success">
              Add Plant
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
