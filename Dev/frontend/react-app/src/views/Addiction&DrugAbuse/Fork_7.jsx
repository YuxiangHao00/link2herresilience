import React, { useState } from 'react';
import { Row, Col, Button, Divider, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D9 from './images/D_9.png';
import C9 from './images/C_9.png';
import C10 from './images/C_10.png';
import Fork_8 from './Fork_8';
import Fork_9 from './Fork_9';
import './Game.less';

const { Title, Paragraph } = Typography;

const Fork_7 = ({ onPrevious, onReturn }) => {
  const [showFork8, setShowFork8] = useState(false);
  const [showFork9, setShowFork9] = useState(false);

  const introText = "Great! You've made a fantastic decision. This is your chance of Redeeming. You finally confront Heisenberg and this is your chance to take action on the dealer.";

  const steps = [
    { image: D9, text: "You gather your courage and approach Heisenberg, determined to make things right." },
  ];

  const choices = [
    { image: C9, text: "Mercy: You give him a chance to disappear!", onClick: () => setShowFork8(true) },
    { image: C10, text: "Vengeance: You plan to hand him over to the cops!", onClick: () => setShowFork9(true) },
  ];

  if (showFork8) {
    return <Fork_8 onPrevious={() => setShowFork8(false)} onReturn={onReturn} />;
  }

  if (showFork9) {
    return <Fork_9 onPrevious={() => setShowFork9(false)} onReturn={onReturn} />;
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
              <Title level={4}>You can make any of the following choices, to continue with the story:</Title>
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

export default Fork_7;