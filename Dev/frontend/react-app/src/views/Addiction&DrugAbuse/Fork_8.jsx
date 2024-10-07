import React from 'react';
import { Row, Col, Button, Divider, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D10 from './images/D_10.svg';
import './Game.less';

const { Title, Paragraph } = Typography;

const Fork_8 = ({ onPrevious, onReturn }) => {
  const introText = "You've made the choice of letting the drug dealer escape. Remember a dealer on the loose is always a more threat for more people becoming an addict.";

  const steps = [
    { image: D10, text: "The Australian Federal Police (AFP) and local law enforcement agencies work hard to reduce the impact of drugs in communities. The country's strict drug control policies aim to protect individuals from falling into addiction." },
    { text: "By choosing not to act:" },
    { text: "• You risk the safety of others" },
    { text: "• You contribute to the spread of addiction" },
    { text: "• You undermine law enforcement efforts" },
    { text: "Take control of the situation next time by reaching out for help—because by doing so, you are protecting not only your own future but the well-being of others in your community." },
  ];

  return (
    <div className="fork-common main-page">
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <div className="game-card final-card">
            <Paragraph className="intro-text">{introText}</Paragraph>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider className="step-divider" />}
                <div className="step-container">
                  {step.image && <img src={step.image} alt={`Step ${index + 1}`} className="step-image" />}
                  <Paragraph className="step-text">{step.text}</Paragraph>
                </div>
              </React.Fragment>
            ))}
            <Divider className="step-divider" />
            <Paragraph className="step-text">
              <a href="https://www.afp.gov.au/crimes/drug-crime" target="_blank" rel="noopener noreferrer">
                Always make sure to visit to Report a Crime or call 000 for emergency.
              </a>
            </Paragraph>
            <div className="navigation-buttons">
              <Button onClick={onPrevious} icon={<LeftOutlined />}>Previous</Button>
              <Button onClick={onReturn} type="primary">Return to Start</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Fork_8;