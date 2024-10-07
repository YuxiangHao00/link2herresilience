import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom'; // 添加这行
import './addiction.less';
import A1 from './images/A_1.png';
import A2 from './images/A_2.png';

const { Title, Paragraph } = Typography;

const AssessLandpage = () => {
  const navigate = useNavigate(); // 添加这行

  const handleStartAssessment = () => {
    navigate('/addiction-prevention/stress-assess'); // 添加这个函数
  };

  return (
    <div className="fixed-width-container">
      <div className="assess-landpage">
        <div className="background-images">
          <img src={A1} alt="Decorative left" className="left-image" />
          <img src={A2} alt="Decorative right" className="right-image" />
        </div>
        <div className="content">
          <Title className="page-title">Predict Your Risk of Substance Abuse</Title>
          <Paragraph>
            Are you wondering how your lifestyle and stress might be impacting your overall health? This
            section offers a predictive AI model that analyzes your stress levels, lifestyle choices, and
            behavioural patterns to provide a comprehensive risk assessment for substance abuse.
            Understanding your risk level allows you to make informed decisions and take steps to avoid
            falling into unhealthy habits.
          </Paragraph>
          <Title level={3}>Key Benefits:</Title>
          <ul>
            <li>AI-driven predictions based on your stress and anxiety data</li>
            <li>Actionable recommendations for improving your lifestyle</li>
            <li>Insights tailored to your unique profile</li>
          </ul>
          <Paragraph>
            Curious about your risk level? Find out today and take proactive steps towards a healthier
            future. Please note that none of your personal information would be collected during this
            assessment and you're response will only help our predictive model to be more precise.
          </Paragraph>
          <Button type="primary" className="start-assessment-btn" onClick={handleStartAssessment}>
            Start Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessLandpage;
