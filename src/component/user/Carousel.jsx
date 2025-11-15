
import React from "react";
import { Carousel as BootstrapCarousel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/plant1.jpg";
import img2 from "../../assets/plant2.jpg";
import img3 from "../../assets/plant3.jpg";

import "./Carousel.css";

function Carousel() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/home"); 
  };

  return (
    <BootstrapCarousel fade interval={3000} controls={false} indicators={false}>
      <BootstrapCarousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={img1}
          alt="Plant 1"
        />
        <BootstrapCarousel.Caption>
          <h3>Fresh Indoor Plants</h3>
          <p>Bring greenery into your home today.</p>
          <Button variant="success" onClick={handleExplore}>
            Explore More
          </Button>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>

      <BootstrapCarousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={img2}
          alt="Plant 2"
        />
        <BootstrapCarousel.Caption>
          <h3>Perfect for Every Corner</h3>
          <p>Decorate your space with easy-care plants.</p>
          <Button variant="success" onClick={handleExplore}>
            Explore More
          </Button>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>

      <BootstrapCarousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={img3}
          alt="Plant 3"
        />
        <BootstrapCarousel.Caption>
          <h3>Eco-Friendly Choices</h3>
          <p>Buy sustainable, air-purifying plants.</p>
          <Button variant="success" onClick={handleExplore}>
            Explore More
          </Button>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
    </BootstrapCarousel>
  );
}

export default Carousel;