import React from 'react';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './addiction.css';
import S1 from './images/S_1.png';
import S2 from './images/S_2.png';
import S3 from './images/S_3.png';

const { Title, Paragraph } = Typography;

const AddictionLandpage = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/addiction-prevention/game');
  };

  const handleStartAssessment = () => {
    navigate('/addiction-prevention/assess');
  };

  const handleStartBreathing = () => {
    navigate('/addiction-prevention/breath');
  };

  const modules = [
    { title: "Game Based Learning Module", image: S1, action: handleStartGame, description: "You are in control of the Game and be careful because the choices you make affects your outcome!" },
    { title: "Risk Assessment", image: S2, action: handleStartAssessment, description: "Answer a few questions and find out if you're in risky of involving in a potential substance abuse" },
    { title: "Stress Relief", image: S3, action: handleStartBreathing, description: "Your self-guided breathing and mindfulness tool to help reduce stress." }
  ];

  return (
    <div className="addiction-prevention main-page">
      <div className="content-wrapper">
        <Title level={2} className="page-title">Stress and LifeStyle</Title>
        <Paragraph className="info-details">
          Welcome to the Stress and Lifestyle Hub
        </Paragraph>
        <Paragraph className="info-details">
          Your journey to better well-being begins here!
        </Paragraph>
        <Paragraph className="info-details">
          At Link2HerResilience, we understand the unique challenges that migrant women face when
          adapting to a new country. From managing stress to maintaining a healthy lifestyle, balancing
          it all can sometimes feel overwhelming. Our goal is to guide you through this process by
          offering practical tools and insights to support your mental and physical well-being.
        </Paragraph>
        <Paragraph className="info-details">
          Ready to take control of your health?
          Explore our three key areas below to find the right support for you:
        </Paragraph>
        <div className="module-row">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              className="module-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={module.action}
            >
              <img src={module.image} alt={module.title} className="module-image" />
              <Title level={4} className="module-title">{module.title}</Title>
              <Paragraph className="module-description">{module.description}</Paragraph>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddictionLandpage;