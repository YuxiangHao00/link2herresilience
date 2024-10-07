import React, { useState } from 'react';
import { Row, Col, Button, Divider, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D6 from './images/D_6.png';
import C7 from './images/C_7.png';
import C8 from './images/C_8.png';
import Fork_5 from './Fork_5';
import Fork_7 from './Fork_7';
import './Game.less';

const { Title, Paragraph } = Typography;

const Fork_4 = ({ onPrevious, onReturn }) => {
  const [showFork5, setShowFork5] = useState(false);
  const [showFork7, setShowFork7] = useState(false);

  const introText = "You start relying on the product more and more to deal with your stress. Due to this, your performance at work significantly deteriorates.";

  const steps = [
    { image: D6, text: "Eventually, you're laid off from work by your boss who sees you as a liability. They have been observing your behaviour and how it has been severely affecting your performance." },
  ];

  const choices = [
    { image: C7, text: "Damnation II: You realize you're addicted to the product and need it again to deal with your anxiety issues.", onClick: () => setShowFork5(true) },
    { image: C8, text: "Redemption II: You realize how the product has messed up your life. You decide to change and take action.", onClick: () => setShowFork7(true) },
  ];

  if (showFork5) {
    return <Fork_5 onPrevious={() => setShowFork5(false)} onReturn={onReturn} />;
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
              <Title level={4}>You can make any of the following choices:</Title>
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

export default Fork_4;