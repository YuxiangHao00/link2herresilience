import React from 'react';
import { Row, Col, Button, Divider, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D11 from './images/D_11.png';
import D12 from './images/D_12.png';
import './Game.less';

const { Title, Paragraph } = Typography;

const Fork_9 = ({ onPrevious, onReturn }) => {
  const introText = "You've made a great decision! You've decided to call the cops on Heisenberg. Thanks to your actions, the dealer is now arrested, preventing them from harming others in the community.";

  const steps = [
    { image: D11, text: "By taking a stand and notifying the authorities, you've not only protected yourself but potentially saved many others from the dangers of substance abuse." },
    { text: "In Australia, law enforcement agencies like the Australian Federal Police (AFP) and local police work tirelessly to combat the distribution of illegal drugs." },
    { text: "By calling the cops:" },
    { text: "• You've helped keep the community safe" },
    { text: "• You've supported law enforcement efforts" },
    { text: "• You've made a responsible choice" },
    { image: D12, text: "Reporting drug dealers not only helps the authorities catch criminals but also sends a strong message that the community is committed to protecting its members from the dangers of addiction." },
  ];

  return (
    <div className="fork-common main-page">
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <div className="game-card final-card">
            <Paragraph className="intro-text">{introText}</Paragraph>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider className="step-divider" />}
                <div className="step-container">
                  {step.image && <img src={step.image} alt={`Step ${index + 1}`} className="step-image" />}
                  <Paragraph className="step-text">{step.text}</Paragraph>
                </div>
              </React.Fragment>
            ))}
            <Divider className="step-divider" />
            <Paragraph className="step-text">
              <a href="https://www.crimestoppersvic.com.au/current-focus/dob-in-a-dealer/" target="_blank" rel="noopener noreferrer">
                For more information on how to dob in a dealer, please click on the link.
              </a>
            </Paragraph>
            <div className="navigation-buttons">
              <Button onClick={onPrevious} icon={<LeftOutlined />}>Previous</Button>
              <Button onClick={onReturn} type="primary">Return to Start</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Fork_9;