import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
      
        <div className="footer-section">
          <h3 className="footer-logo">🌿 PLANT A PLANT</h3>
          <p>Bringing nature closer to your home. Fresh indoor & outdoor plants for every space.</p>
        </div>

      
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

    
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: plantaplant@gmail.com</p>
          <p>Phone: +91 7906754682</p>
          <p>Location: Trivandrum, Kerala</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 GreenLeaf. All rights reserved 🌱</p>
      </div>
    </footer>
  );
}

export default Footer;