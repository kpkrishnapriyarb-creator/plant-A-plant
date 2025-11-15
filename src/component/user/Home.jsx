import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img4 from "../../assets/homeplant.jpg"
import peaceLily from "../../assets/plant1.jpg";
import snakePlant from "../../assets/plant2.jpg";
import aloeVera from "../../assets/plant3.jpg";
import "./Home.css";



function Home() {
  const navigate = useNavigate();

  return (
    <section className="hero-section" id="home">
      <Container>
        {/* Hero Section */}
        <Row className="align-items-center">
          <Col md={6}>
          <br />
          <br />
          <br />
            <h1>Fresh Indoor Plants 🌿</h1>
            <p>
              Bring life and freshness into your home. Explore our collection of
              indoor and outdoor plants perfect for any space.
            </p>
            <div className="mt-4 d-flex gap-3">
              <Button variant="success" onClick={() => navigate("/shop")}>
                Shop Now
              </Button>
              
            </div>
          </Col>
          <Col md={6}>
            <img
              src={img4}
              alt="plant"
               className="hero-img"
            />
          </Col>
        </Row>

        <br />
        <br />
        <br />
        <br />
        <br />
      

        {/*  Gallery Preview Section */}
        <div className="mt-5 text-center">
          <h3 className="mb-4">🌿 Our Plant Gallery 🌿</h3>

          <Row className="justify-content-center">
            <Col md={3}>
              <Card className="mb-4 shadow-sm">
                <Card.Img variant="top" src={peaceLily} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>Peace Lily</Card.Title>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="mb-4 shadow-sm">
                <Card.Img variant="top" src={snakePlant} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>Snake Plant</Card.Title>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="mb-4 shadow-sm">
                <Card.Img variant="top" src={aloeVera} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>Aloe Vera</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Button
            variant="outline-success"
            className="mt-3"
            onClick={() => navigate("/Gallery")}
          >
            View More
          </Button>
        </div>
        
      </Container>

      
    </section>
  );
}
export default Home