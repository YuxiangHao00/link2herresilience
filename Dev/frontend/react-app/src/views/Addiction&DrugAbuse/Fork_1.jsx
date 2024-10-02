import React, { useState } from 'react';
import { Row, Col, Button, Divider } from 'antd';
import D1 from './images/D_1.jpg';
import D2 from './images/D_2.png';
import D3 from './images/D_3.png';
import C1 from './images/C_1.png';
import C2 from './images/C_2.png';
import Fork_2 from './Fork_2';
import Fork_10 from './Fork_10';
import './Game.less';

const Fork_1 = ({ onReturn }) => {
  const [showFork2, setShowFork2] = useState(false);
  const [showFork10, setShowFork10] = useState(false);

  const introText = "You are a Migrant Woman named Annie who arrived in Australia 8 months ago. You found a job and doing pretty well and settled well in your new country. Due to the recent downsizing at your company, you are overwhelmed with work-overload and hence, dealing with severe stress and anxiety issues.";

  const steps = [
    { image: D1, text: "Page1: You are waiting for the bus to go back home after your overly busy day at work." },
    { image: D2, text: "Page2: A strange looking man named 'Heisenberg' approaches you, and although looked suspicious, he seemed to be friendly and genuinely concerned about how stressed you are and expresses his concerns." },
    { image: D3, text: "Page3: He tells you how managing a work-life balance can be a heinous task. He immediately withdraws a small pouch and proposes you to try it." },
  ];

  const choices = [
    { image: C1, text: "Accept it" },
    { image: C2, text: "Deny it" },
  ];

  if (showFork2) {
    return <Fork_2 onPrevious={() => setShowFork2(false)} onReturn={onReturn} />;
  }

  if (showFork10) {
    return <Fork_10 onPrevious={() => setShowFork10(false)} onReturn={onReturn} />;
  }

  return (
    <div className="fork-common main-page">
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <div className="game-card">
            <p className="intro-text">{introText}</p>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <Divider className="step-divider" />
                <div className="step-container">
                  <img src={step.image} alt={`Step ${index + 1}`} className="step-image" />
                  <p className="step-text">{step.text}</p>
                </div>
              </React.Fragment>
            ))}
            <Divider className="step-divider" />
            <div className="choices">
              <h2>You have the following two options to make. Either you accept the product to see if it really helps with your stress, or to deny it.</h2>
              <Row gutter={[16, 16]}>
                {choices.map((choice, index) => (
                  <Col xs={24} sm={12} key={index}>
                    <div className="choice-card">
                      <img src={choice.image} alt={`Choice ${index + 1}`} className="choice-image" />
                      <p className="choice-text">{choice.text}</p>
                      <Button onClick={() => index === 0 ? setShowFork2(true) : setShowFork10(true)}>Select</Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Fork_1;