import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import F1 from './images/F_1.png';
import './Game.less';

const { Title, Paragraph, Text } = Typography;

const Fork_6 = ({ onReturn }) => {
  return (
    <div className="fork-common main-page">
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <div className="game-card final-card">
            <Title level={3}>You're under arrest! You've been caught trying to buy drugs, only to discover the dealer is actually an undercover police officer. What seemed like a way to satisfy your addiction has now led to serious legal consequences.</Title>
            
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={12}>
                <img src={F1} alt="Australian Federal Police Badge" className="afp-badge" />
              </Col>
              <Col xs={24} md={12}>
                <Paragraph>
                  Australian law enforcement agencies, including the Australian Federal Police (AFP) and local police, use undercover operations as a crucial method to combat drug crime.
                </Paragraph>
                <Paragraph>
                  Getting caught in a drug deal can have severe repercussions, including:
                </Paragraph>
                <ul>
                  <li>Criminal Charges: You could be charged with possession, intent to distribute, or even trafficking. These charges can result in significant fines, a criminal record, or imprisonment.</li>
                  <li>Permanent Record: A conviction for drug offences in Australia can stay on your record and affect your future opportunities—making it harder to find a job, apply for certain visas, or even rent a place to live.</li>
                  <li>Impact on Migration Status: If you're a migrant or hold a temporary visa, drug-related offences can jeopardize your immigration status, leading to potential visa cancellations or deportation.</li>
                </ul>
              </Col>
            </Row>

            <Paragraph>
              Next time, think carefully about the choices you make. If you're struggling with substance abuse, there are resources available.
            </Paragraph>
            
            <Paragraph>
              <a href="https://www.health.vic.gov.au/alcohol-and-drugs/alcohol-and-other-drug-treatment-services" target="_blank" rel="noopener noreferrer">
                If you're looking for drug treatment services, click on the link.
              </a>
            </Paragraph>
            
            <Paragraph>
              <a href="https://www.emhprac.org.au/directory/national-alcohol-and-other-drug-hotline/" target="_blank" rel="noopener noreferrer">
                Australia also provides a Hotline number if you need to speak with someone urgently.
              </a>
            </Paragraph>
            
            <Paragraph>
              For more information on Drug offences in Australia, click the link.
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

export default Fork_6;