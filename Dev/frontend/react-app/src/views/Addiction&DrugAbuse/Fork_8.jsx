import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D10 from './images/D_10.svg';
import './Game.less';

const { Title, Paragraph, Text } = Typography;

const Fork_8 = ({ onReturn }) => {
  return (
    <div className="fork-common main-page">
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <div className="game-card final-card">
            <Title level={3}>You've made the choice of letting the drug dealer escape. Remember a dealer on the loose is always a more threat for more people becoming an addict.</Title>
            
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={24}>
                <img src={D10} alt="People at a bus stop" className="full-width-image" />
              </Col>
            </Row>

            <Paragraph>
              The Australian Federal Police (AFP) and local law enforcement agencies work hard to reduce the impact of drugs in communities. The country's strict drug control policies aim to protect individuals from falling into addiction.
            </Paragraph>

            <Paragraph>
              By choosing not to act:
            </Paragraph>
            <ul>
              <li>- You risk the safety of others</li>
              <li>- You contribute to the spread of addiction</li>
              <li>- You undermine law enforcement efforts</li>
            </ul>

            <Paragraph>
              Take control of the situation next time by reaching out for help—because by doing so, you are protecting not only your own future but the well-being of others in your community.
            </Paragraph>
            
            <Paragraph>
              <a href="https://www.afp.gov.au/crimes/drug-crime" target="_blank" rel="noopener noreferrer">
                Always make sure to visit to Report a Crime or call 000 for emergency.
              </a>
            </Paragraph>

            <div className="navigation-buttons">
              <Button onClick={onReturn} icon={<LeftOutlined />}>Return to Start</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Fork_8;