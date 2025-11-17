import React from 'react';
import './AboutUs.css'; // For styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>Our Story: Nurturing Your Indoor Oasis</h1>
        <p>Bringing the beauty and tranquility of nature right into your home.</p>
      </header>

      <section className="mission-section">
        <div className="mission-content">
          <h2>🌿 Our Mission</h2>
          <p>
            At *GreenThumb Gardens, we believe that every home deserves a touch of vibrant, natural life. Our mission is simple: to make it **easy and joyful* for you to become a successful indoor plant parent. We hand-select the healthiest, happiest plants and provide you with all the knowledge you need to help them thrive.
          </p>
          <p className="highlight">
            *More than just a store, we are your partner in green living.*
          </p>
        </div>
        [attachment_0](attachment)
      </section>

      <hr />

      <section className="values-section">
        <h2>💖 Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Quality & Health</h3>
            <p>We source only premium, nursery-grown plants and ensure they are pest-free and robust before they ever reach your door.</p>
          </div>
          <div className="value-card">
            <h3>Sustainable Sourcing</h3>
            <p>We are committed to eco-friendly practices, from sustainable potting mixes to minimizing plastic in our packaging.</p>
          </div>
          <div className="value-card">
            <h3>Education & Support</h3>
            <p>Every plant comes with detailed care guides, and our 'Plant Doctor' support team is always ready to answer your questions.</p>
          </div>
        </div>
      </section>
      
      <hr />

      <section className="team-section">
        <h2>🧑‍🌾 Meet the Founder</h2>
        <div className="founder-bio">
          <div className="founder-image">
            
          </div>
          <p>
            Hi, I'm *[Founder's Name]*, and my love affair with indoor plants started in a small city apartment. I quickly realized the incredible impact a little bit of green can have on well-being. I founded GreenThumb Gardens to share that feeling and to demystify plant care for everyone. We're a small, passionate team, and we can't wait to help you find your next green friend!
          </p>
        </div>
      </section>
      
      <footer className="about-us-footer">
        <p>Ready to get growing? <a href="/shop">*Shop Our Collection Today!*</a></p>
      </footer>
    </div>
  );
};

export default AboutUs;