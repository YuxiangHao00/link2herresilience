import React, { useState } from 'react';
import { Row, Col, Button, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D4 from './images/D_4.png';
import C3 from './images/C_3.png';
import C4 from './images/C_4.png';
import Fork_3 from './Fork_3';
import './Game.less';

const Fork_2 = ({ onPrevious, onReturn }) => {
  const [showFork3, setShowFork3] = useState(false);

  const introText = "You bring the product home and decide to try it.";

  const steps = [
    { image: D4, text: "After consuming it, you start experiencing severe dizziness and the product tends to make you forget all the problems you've been facing. You pass out after a few minutes only to wake up in the morning, already running late for work and in a completely messed up state." },
  ];

  const choices = [
    { image: C3, text: "Damnation: You liked it so much, you're willing to try it again even though you're in a completely messed up state." },
    { image: C4, text: "Redemption: You realize that you've done a grave mistake as this can ruin your life permanently." },
  ];

  if (showFork3) {
    return <Fork_3 onPrevious={() => setShowFork3(false)} onReturn={onReturn} />;
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
              <h2>Time to redeem yourself, you can choose any one of the following option to continue with the story:</h2>
              <Row gutter={[16, 16]}>
                {choices.map((choice, index) => (
                  <Col xs={24} sm={12} key={index}>
                    <div className="choice-card">
                      <img src={choice.image} alt={`Choice ${index + 1}`} className="choice-image" />
                      <p className="choice-text">{choice.text}</p>
                      <Button onClick={() => setShowFork3(true)}>Select</Button>
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

export default Fork_2;