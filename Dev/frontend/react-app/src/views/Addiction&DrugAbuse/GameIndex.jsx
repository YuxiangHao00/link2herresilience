import React, { useState } from 'react';
import { Button, Row, Col, Typography, Divider } from 'antd';
import './addiction.less';
import './Game.less';
import Fork_1 from './Fork_1';

const { Title, Paragraph } = Typography;

const GameIndex = () => {
  const [showFork1, setShowFork1] = useState(false);
  const [startTransition, setStartTransition] = useState(false);

  const handleStart = () => {
    setStartTransition(true);
    setTimeout(() => {
      setShowFork1(true);
    }, 2000); // 2秒后开始游戏
  };

  const handleReturn = () => {
    setShowFork1(false);
    setStartTransition(false);
  };

  if (showFork1) {
    return <Fork_1 onReturn={handleReturn} />;
  }

  return (
    <div className={`fork-common main-page ${startTransition ? 'transition' : ''}`}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <div className="game-card">
            <Title level={2} className="page-title">Welcome to the Journey of Awareness: Preventing Substance Abuse through Stories</Title>
            <Paragraph className="intro-text">
              Substance abuse is a serious concern, especially for migrant women navigating a new life in
              Australia. It can start with a single poor decision and lead to long-term physical, mental, and
              legal consequences.
            </Paragraph>
            <Paragraph className="intro-text">
              But through knowledge and awareness, you can make informed decisions and protect your
              well-being.
            </Paragraph>
            <Paragraph className="intro-text">
              Our interactive, story-based game is designed to educate and empower you.
            </Paragraph>
            <Divider className="step-divider" />
            <Title level={3} className="subtitle">What Is the Game About?</Title>
            <Paragraph className="step-text">
              In this interactive journey, you'll step into the shoes of characters who face real-life
              challenges around substance use and addiction. These characters, like you, are navigating the
              complexities of life in Australia, dealing with stress, anxiety, social pressure, and new
              environments. You will be faced with key decisions along the way—choices that could lead to
              dangerous consequences or safer, healthier outcomes.
            </Paragraph>
            <Divider className="step-divider" />
            <Title level={3} className="subtitle">Why Is This Important?</Title>
            <Paragraph className="step-text">
              Substance abuse is a growing issue in Australia, and the consequences can be severe—
              especially for migrants who may be more vulnerable due to isolation, cultural differences, or
              stress. By understanding the risks before they arise, you can protect yourself and your loved
              ones from falling victim to these dangers.
            </Paragraph>
            <Divider className="step-divider" />
            <Title level={3} className="subtitle">Take Control of Your Story</Title>
            <Paragraph className="step-text">
              Your choices in the game reflect the choices you can make in real life. By playing through
              different scenarios, you'll gain the knowledge to make safer, healthier decisions—
              empowering you to take control of your life and avoid the traps of substance abuse.
            </Paragraph>
            <div className="start-button-container">
              <Button type="primary" className="main-btn" onClick={handleStart}>
                Start Game!
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GameIndex;
