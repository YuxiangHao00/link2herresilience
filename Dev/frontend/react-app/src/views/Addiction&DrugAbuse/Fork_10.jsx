import React, { useState } from 'react';
import { Row, Col, Button, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D13 from './images/D_13.png';
import C11 from './images/C_11.png';
import C12 from './images/C_12.png';
import Fork_7 from './Fork_7';
import Fork_11 from './Fork_11';
import './Game.less';

const Fork_10 = ({ onPrevious, onReturn }) => {
  const [showFork7, setShowFork7] = useState(false);
  const [showFork11, setShowFork11] = useState(false);

  const introText = "You chose to omit his proposal. But...";

  const steps = [
    { image: D13, text: "Heisenberg proposes a new deal by reducing the amount for the substance significantly. He also tells you about how the product has drastically helped other consumers previously on how it has helped them to tackle their stress and anxiety issues." },
  ];

  const choices = [
    { image: C11, text: "Enticing: After hearing his proposal, you decide to try the product out yourself." },
    { image: C12, text: "Repudiate: Although his offer might be tempting, you stand on your decision." },
  ];

  if (showFork7) {
    return <Fork_7 onPrevious={() => setShowFork7(false)} onReturn={onReturn} />;
  }

  if (showFork11) {
    return <Fork_11 onPrevious={() => setShowFork11(false)} onReturn={onReturn} />;
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
              <h2>You can choose any one of the following options to continue with the story.</h2>
              <Row gutter={[16, 16]}>
                {choices.map((choice, index) => (
                  <Col xs={24} sm={12} key={index}>
                    <div className="choice-card">
                      <img src={choice.image} alt={`Choice ${index + 1}`} className="choice-image" />
                      <p className="choice-text">{choice.text}</p>
                      <Button onClick={() => index === 0 ? setShowFork7(true) : setShowFork11(true)}>Select</Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            <Divider className="step-divider" />
            <div className="navigation-buttons">
              <Button onClick={onPrevious} icon={<LeftOutlined />}>Previous</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Fork_10;