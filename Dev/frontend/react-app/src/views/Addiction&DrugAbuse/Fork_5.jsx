import React, { useState } from 'react';
import { Row, Col, Button, Divider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import D7 from './images/D_7.svg';
import D8 from './images/D_8.png';
import Fork_6 from './Fork_6';
import './Game.less';

const Fork_5 = ({ onPrevious, onReturn }) => {
  const [showFork6, setShowFork6] = useState(false);

  const steps = [
    { image: D7, text: "Unaware how much of an addict you've become, you reach the bus stop, again, hoping to find Heisenberg." },
    { text: "Until..." },
    { image: D8, text: "He isn't Heisenberg, but a Drug Enforcement Agent, working undercover to catch people who are buying illegal substances from dealers.\n\nHow? Unfortunately, you've been snitched by your boss who had been observing you're behaviours since a couple of weeks." },
  ];

  if (showFork6) {
    return <Fork_6 onReturn={onReturn} />;
  }

  return (
    <div className="fork-common main-page">
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <div className="game-card">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider className="step-divider" />}
                <div className="step-container">
                  {step.image && <img src={step.image} alt={`Step ${index + 1}`} className="step-image" />}
                  {step.text && <p className={`step-text ${!step.image ? 'text-center' : ''}`}>{step.text}</p>}
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