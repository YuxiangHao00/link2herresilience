import React, { useState } from 'react';
import { Row, Col, Button, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D5 from './images/D_5.svg';
import C5 from './images/C_5.png';
import C6 from './images/C_6.png';
import Fork_4 from './Fork_4';
import Fork_7 from './Fork_7';
import './Game.less';

const Fork_3 = ({ onPrevious, onReturn }) => {
  const [showFork4, setShowFork4] = useState(false);
  const [showFork7, setShowFork7] = useState(false);

  const introText = "After your job, you head back to the bus stop hoping to find Heisenberg again.";

  const steps = [
    { image: D5, text: "You can make any of the following choices. Remember how Annie felt last night after consuming the product." },
  ];

  const choices = [
    { image: C5, text: "You realize how important it is to deal with your stress and anxiety and decide to go for it again..." },
    { image: C6, text: "You realize the messed up situation you were in and how it can impact your life and decide to take action on the dealer." },
  ];

  if (showFork4) {
    return <Fork_4 onPrevious={() => setShowFork4(false)} onReturn={onReturn} />;
  }

  if (showFork7) {
    return <Fork_7 onPrevious={() => setShowFork7(false)} onReturn={onReturn} />;
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
              <h2>Choose your next action:</h2>
              <Row gutter={[16, 16]}>
                {choices.map((choice, index) => (
                  <Col xs={24} sm={12} key={index}>
                    <div className="choice-card">
                      <img src={choice.image} alt={`Choice ${index + 1}`} className="choice-image" />
                      <p className="choice-text">{choice.text}</p>
                      <Button onClick={() => index === 0 ? setShowFork4(true) : setShowFork7(true)}>Select</Button>
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

export default Fork_3;