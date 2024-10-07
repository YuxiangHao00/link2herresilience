import React, { useState } from 'react';
import { Row, Col, Button, Divider, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D14 from './images/D_14.png';
import C13 from './images/C_13.png';
import C14 from './images/C_14.png';
import Fork_2 from './Fork_2';
import Fork_7 from './Fork_7';
import './Game.less';

const { Title, Paragraph } = Typography;

const Fork_11 = ({ onPrevious, onReturn }) => {
  const [showFork2, setShowFork2] = useState(false);
  const [showFork7, setShowFork7] = useState(false);

  const introText = "Although you thought this might be the end of him, he still has more to say...";

  const steps = [
    { image: D14, text: "Heisenberg offers to try the product out with him. He continues to let you know how the product has helped others overcome stress and anxiety attacks.\n\nHe ensures that if this still does not attract you, he would not bother you any more..." },
  ];

  const choices = [
    { image: C13, text: "Temptation: After all his requests, you decide to try it and now, you're head over heels about the product.", onClick: () => setShowFork2(true) },
    { image: C14, text: "Hindrance: You realize he is trying to sell an illegal substance to you and decide to take action against him.", onClick: () => setShowFork7(true) },
  ];

  if (showFork2) {
    return <Fork_2 onPrevious={() => setShowFork2(false)} onReturn={onReturn} />;
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
              <Title level={4}>You can choose any one of the following options to advance with the story:</Title>
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

export default Fork_11;