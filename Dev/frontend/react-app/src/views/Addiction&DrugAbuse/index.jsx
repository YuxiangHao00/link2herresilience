import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import './addiction.less';
import Fork_1 from './Fork_1';

const AddictionPrevention = () => {
  const [showFork1, setShowFork1] = useState(false);

  const handleReturn = () => {
    setShowFork1(false);
  };

  if (showFork1) {
    return <Fork_1 onReturn={handleReturn} />;
  }

  return (
    <div className="addiction-prevention main-page">
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <div className="main-card">
            <header>
              <h1 className="page-title">Welcome to the Journey of Awareness: Preventing Substance Abuse through Stories</h1>
            </header>
            <p className="info-details">
              Substance abuse is a serious concern, especially for migrant women navigating a new life in
              Australia. It can start with a single poor decision and lead to long-term physical, mental, and
              legal consequences.
            </p>
            <p className="info-details">
              But through knowledge and awareness, you can make informed decisions and protect your
              well-being.
            </p>
            <p className="info-details">
              Our interactive, story-based game is designed to educate and empower you.
            </p>
            <h2 className="subtitle">What Is the Game About?</h2>
            <p className="info-details">
              In this interactive journey, you'll step into the shoes of characters who face real-life
              challenges around substance use and addiction. These characters, like you, are navigating the
              complexities of life in Australia, dealing with stress, anxiety, social pressure, and new
              environments. You will be faced with key decisions along the way—choices that could lead to
              dangerous consequences or safer, healthier outcomes.
            </p>
            <h2 className="subtitle">Why Is This Important?</h2>
            <p className="info-details">
              Substance abuse is a growing issue in Australia, and the consequences can be severe—
              especially for migrants who may be more vulnerable due to isolation, cultural differences, or
              stress. By understanding the risks before they arise, you can protect yourself and your loved
              ones from falling victim to these dangers.
            </p>
            <h2 className="subtitle">Take Control of Your Story</h2>
            <p className="info-details">
              Your choices in the game reflect the choices you can make in real life. By playing through
              different scenarios, you'll gain the knowledge to make safer, healthier decisions—
              empowering you to take control of your life and avoid the traps of substance abuse.
            </p>
            <Button type="primary" className="main-btn" onClick={() => setShowFork1(true)}>
              Start Game!
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddictionPrevention;
