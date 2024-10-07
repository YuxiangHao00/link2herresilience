import React, { useState } from 'react';
import { Row, Col, Button, Divider, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D7 from './images/D_7.svg';
import D8 from './images/D_8.png';
import Fork_6 from './Fork_6';
import './Game.less';

const { Title, Paragraph } = Typography;

const Fork_5 = ({ onPrevious, onReturn }) => {
  const [showFork6, setShowFork6] = useState(false);

  const introText = "Unaware how much of an addict you've become, you reach the bus stop, again, hoping to find Heisenberg.";

  const steps = [
    { image: D7, text: "You wait anxiously at the bus stop, scanning the area for any sign of Heisenberg." },
    { text: "Until..." },
    { image: D8, text: "He isn't Heisenberg, but a Drug Enforcement Agent, working undercover to catch people who are buying illegal substances from dealers.\n\nHow? Unfortunately, you've been reported by your boss who had been observing your behavior for the past couple of weeks." },
  ];

  if (showFork6) {
    return <Fork_6 onPrevious={() => setShowFork6(false)} onReturn={onReturn} />;
  }

  return (
    <div className="fork-common main-page">
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <div className="game-card">
            <Paragraph className="intro-text">{introText}</Paragraph>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider className="step-divider" />}
                <div className="step-container">
                  {step.image && <img src={step.image} alt={`Step ${index + 1}`} className="step-image" />}
                  {step.text && <Paragraph className={`step-text ${!step.image ? 'text-center' : ''}`}>{step.text}</Paragraph>}
                </div>
              </React.Fragment>
            ))}
            <Divider className="step-divider" />
            <div className="navigation-buttons">
              <Button onClick={onPrevious} icon={<LeftOutlined />}>Previous</Button>
              <Button onClick={() => setShowFork6(true)} type="primary">Continue</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Fork_5;