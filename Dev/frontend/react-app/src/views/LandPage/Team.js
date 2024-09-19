import React from 'react';
import './LandPage.css';
import teamM1 from './images/TeamM_1.png';
import teamM2 from './images/TeamM_2.png';
import teamM3 from './images/TeamM_3.png';
import teamM4 from './images/TeamM_4.png';

function Team({ onBack }) {
  return (
    <div className="sub-page team-page">
      <h2 className="page-title">Our Resilience Team</h2>
      <p>At Link2HerResilience, we are proud to introduce our dedicated team of professionals who work tirelessly to empower migrant women in Australia. We call ourselves the "Harmony" team, as we bring together diverse skills and backgrounds to create a harmonious platform for health and well-being.</p>
      
      <h3 className="sub-title">Meet Our Team Members</h3>
      <div className="team-grid">
        <div className="team-member">
          <div className="image-container">
            <img src={teamM1} alt="Yuxiang" className="member-image" />
          </div>
          <h4 style={{ fontWeight: 'bold' }}>Yuxiang</h4>
          <p>Our IT Expert</p>
          <p>With extensive expertise in IT, Yuxiang is responsible for the development and maintenance of our website. His technical skills ensure that our platform is user-friendly, responsive, and accessible to all our users.</p>
        </div>
        
        <div className="team-member">
          <div className="image-container">
            <img src={teamM2} alt="Mandeep Singh" className="member-image" />
          </div>
          <h4 style={{ fontWeight: 'bold' }}>Mandeep Singh</h4>
          <p>AI and Machine Learning Specialist</p>
          <p>Mandeep brings his expertise in Artificial Intelligence and Machine Learning to our team. He works on developing intelligent algorithms that personalize user experiences and provide data-driven insights for our health recommendations.</p>
        </div>
        
        <div className="team-member">
          <div className="image-container">
            <img src={teamM3} alt="Yanxin Zheng" className="member-image" />
          </div>
          <h4 style={{ fontWeight: 'bold' }}>Yanxin Zheng</h4>
          <p>Data Scientist</p>
          <p>As our Data Scientist, Yanxin handles data visualization and management. Her work is crucial in transforming complex health data into easy-to-understand visuals and actionable insights for our users.</p>
        </div>
        
        <div className="team-member">
          <div className="image-container">
            <img src={teamM4} alt="Gagan" className="member-image" />
          </div>
          <h4 style={{ fontWeight: 'bold' }}>Gagan</h4>
          <p>Cyber Security Expert</p>
          <p>With his expertise in Cyber Security, Gagan ensures that our website and user data are protected against potential threats. His work is vital in maintaining the trust and confidentiality of our users' information.</p>
        </div>
      </div>

      <h3 className="sub-title">Our Commitment</h3>
      <p>Together, we are committed to providing a secure, informative, and empowering platform for migrant women in Australia. Our diverse skills and backgrounds allow us to approach challenges from multiple perspectives, ensuring that we deliver a comprehensive and inclusive service.</p>
      
      <p className="closing">We are the Harmony team, working in unison to support your journey towards resilience and well-being in Australia.</p>

      <button onClick={onBack} className="back-button">Back to Main Page</button>
    </div>
  );
}

export default Team;