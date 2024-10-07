import React, { useState } from 'react';
import { Row, Col, Button, Divider, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D5 from './images/D_5.svg';
import C5 from './images/C_5.png';
import C6 from './images/C_6.png';
import Fork_4 from './Fork_4';
import Fork_7 from './Fork_7';
import './Game.less';

const { Title, Paragraph } = Typography;

const Fork_3 = ({ onPrevious, onReturn }) => {
  const [showFork4, setShowFork4] = useState(false);
  const [showFork7, setShowFork7] = useState(false);

  const introText = "After your job, you head back to the bus stop hoping to find Heisenberg again.";

  const steps = [
    { image: D5, text: "You can make any of the following choices. Remember how Annie felt last night after consuming the product." },
  ];

  const choices = [
    { image: C5, text: "You realize how important it is to deal with your stress and anxiety and decide to go for it again...", onClick: () => setShowFork4(true) },
    { image: C6, text: "You realize the messed up situation you were in and how it can impact your life and decide to take action on the dealer.", onClick: () => setShowFork7(true) },
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
            <Paragraph className="intro-text">{introText}</Paragraph>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <Divider className="step-divider" />
                <div className="step-container">
                  <img src={step.image} alt={`Step ${index + 1}`} className="step-image" />
                  <Paragraph className="step-text">{step.text}</Paragraph>
                </div>
              </React.Fragment>
            ))}
            <Divider className="step-divider" />
            <div className="choices">
              <Title level={4}>Choose your next action:</Title>
              <Row gutter={[16, 16]}>
                {choices.map((choice, index) => (
                  <Col xs={24} sm={12} key={index}>
                    <div className="choice-card" onClick={choice.onClick}>
                      <img src={choice.image} alt={`Choice ${index + 1}`} className="choice-image" />
                      <Paragraph className="choice-text">{choice.text}</Paragraph>
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