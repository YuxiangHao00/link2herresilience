import React from 'react';
import './LandPage.css';

function AboutUs({ onBack }) {
  return (
    <div className="sub-page about-us">
      <h2 className="page-title">About Us</h2>
      <h3 className="sub-title">Welcome to Link2HerResilience</h3>
      <p>At Link2HerResilience, we believe that every migrant woman in Australia deserves access to accurate, culturally sensitive, and empowering health information. Our mission is to provide a reliable, supportive platform tailored specifically to the needs of migrant women as they navigate the complex landscape of health and well-being in their new home.</p>
      <p>Our platform is designed to address the unique challenges migrant women face, including language barriers, health access, cultural understanding, and personal safety. Whether it's understanding reproductive rights, managing chronic health conditions, or ensuring a safe environment for you and your family, Link2HerResilience is here to guide you every step of the way.</p>

      <h3 className="sub-title">Our Key Features</h3>
      <ul className="feature-list">
        <li><strong>Comprehensive Health Insights:</strong> Explore a detailed list of common health issues faced by women in Australia, complete with prevalence indicators and easy-to-read visualizations. Learn how these conditions vary across different regions in Australia, so you can make informed choices for yourself and your family.</li>
        <li><strong>Personalized Health Data:</strong> Use our filtering and geographic tools to understand health risks specific to your location, age group, and cultural background. Discover the best places in Australia to live based on air quality, pollen count, or available medical support from professionals who understand your culture.</li>
        <li><strong>Culturally Sensitive Education:</strong> Access clear and engaging information about sexual health, STIs, reproductive rights, and family planning—topics that are often difficult to approach. We present this content in a way that respects cultural differences while ensuring that every woman can make informed, confident decisions about her health.</li>
        <li><strong>Sleep Health Monitoring:</strong> As sleep plays a vital role in your well-being, our platform offers insights into sleep quality based on ambient conditions like noise and temperature. Migrant women can track their sleep patterns and receive recommendations for better rest, ensuring you wake up refreshed and ready to face the day.</li>
      </ul>

      <h3 className="sub-title">Our Vision</h3>
      <p>Our goal is to create a community of resilient women who are empowered to take control of their health, well-being, and future. We understand the challenges of building a new life in a foreign country, and we aim to provide the tools and information to make that journey smoother and more informed.</p>
      <p>At Link2HerResilience, we're committed to making health and well-being resources accessible to all migrant women in Australia. No matter your background, language, or health concern, we're here to help you live a healthier, happier, and more resilient life.</p>
      <p className="closing">Join us on this journey to resilience!</p>

      <button onClick={onBack} className="back-button">Back to Main Page</button>
    </div>
  );
}

export default AboutUs;