import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import D11 from './images/D_11.png';
import D12 from './images/D_12.png';
import './Game.less';

const { Title, Paragraph, Text } = Typography;

const Fork_9 = ({ onReturn }) => {
  return (
    <div className="fork-common main-page">
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <div className="game-card final-card">
            <Title level={3}>You've made a great decision! You've decided to call the cops on Heisenberg. Thanks to your actions, the dealer is now arrested, preventing them from harming others in the community.</Title>
            
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={12}>
                <img src={D11} alt="Police car" className="full-width-image" />
              </Col>
              <Col xs={24} md={12}>
                <Paragraph>
                  By taking a stand and notifying the authorities, you've not only protected yourself but potentially saved many others from the dangers of substance abuse.
                </Paragraph>
              </Col>
            </Row>

            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={12}>
                <Paragraph>
                  In Australia, law enforcement agencies like the Australian Federal Police (AFP) and local police work tirelessly to combat the distribution of illegal drugs.
                </Paragraph>
                <Paragraph>
                  By calling the cops:
                </Paragraph>
                <ul>
                  <li>- You've helped keep the community safe</li>
                  <li>- You've supported law enforcement efforts</li>
                  <li>- You've made a responsible choice</li>
                </ul>
              </Col>
              <Col xs={24} md={12}>
                <img src={D12} alt="Police officer" className="full-width-image" />
              </Col>
            </Row>

            <Paragraph>
              Reporting drug dealers not only helps the authorities catch criminals but also sends a strong message that the community is committed to protecting its members from the dangers of addiction.
            </Paragraph>
            
            <Paragraph>
              <a href="https://www.crimestoppersvic.com.au/current-focus/dob-in-a-dealer/" target="_blank" rel="noopener noreferrer">
                For more information on how to how to dob in a dealer, please click on the link.
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

export default Fork_9;