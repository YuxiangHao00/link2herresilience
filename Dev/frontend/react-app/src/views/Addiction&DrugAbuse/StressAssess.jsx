import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Typography, Radio, Select, Button, Space, Progress, Card, Divider, Row, Col, message, Tag, Statistic, List } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './addiction.less';
import questionnaireData from '../../data/7.3-questionnaire_data.json';
import { CheckCircleOutlined, WarningOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const StressAssess = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [questionnaire, setQuestionnaire] = useState(questionnaireData);
  const [sessionId, setSessionId] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const topRef = useRef(null);

  const [allAnswers, setAllAnswers] = useState({});
  const [currentSectionAnswers, setCurrentSectionAnswers] = useState({});

  useEffect(() => {
    setSessionId(uuidv4().substring(0, 8));
    console.log('Questionnaire data:', questionnaire);
  }, []);

  const progress = useMemo(() => {
    if (questionnaire.length > 0) {
      return Math.floor((currentSection - 1) / questionnaire.length * 100);
    }
    return 0;
  }, [currentSection, questionnaire.length]);

  const handleAnswer = (questionId, answerId) => {
    setCurrentSectionAnswers(prev => ({ ...prev, [questionId]: answerId }));
    setAllAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextSection = async () => {
    const currentQuestions = questionnaire[currentSection - 1]?.questions || [];
    const unansweredRequiredQuestions = currentQuestions.filter(
      q => q.is_require === 1 && !currentSectionAnswers[q.question_id]
    );

    if (unansweredRequiredQuestions.length > 0) {
      message.error('Please answer all required questions before proceeding.');
      return;
    }

    if (currentSection === questionnaire.length) {
      try {
        const fixedSectionIds = [2,2,2,2,2,3,3,3,4,5,6];
        const fixedQuestionIds = ['3a','3b','3c','4','5','2','5','6','3','3','1'];
        const responseIds = fixedQuestionIds.map(qId => allAnswers[qId] || '1');

        const baseUrl = 'https://link2herresilience.com.au/lifestyle/v1/analyse_risk';
        const url = `${baseUrl}?session_id=${sessionId}&section_id=[${fixedSectionIds.join(',')}]&question_id=[${fixedQuestionIds.join(',')}]&response_id=[${responseIds.join(',')}]`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Parsed API Response:', JSON.stringify(data, null, 2));
        setResult(data);
      } catch (error) {
        console.error('Error submitting answers:', error);
        message.error(`An error occurred: ${error.message}`);
      }
    } else {
      setCurrentSection(prev => prev + 1);
      setCurrentSectionAnswers({});
      scrollToTop();
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(prev => prev - 1);
      requestAnimationFrame(() => {
        scrollToTop();
      });
    }
  };

  const returnToHome = () => {
    navigate('/addiction-prevention');
  };

  const renderQuestion = (question, index) => {
    return (
      <Card 
        key={question.question_id}
        className={`question-card ${question.is_require === 1 ? 'required-question' : ''}`}
        title={
          <Paragraph strong style={{ fontSize: '16px', marginBottom: '10px', whiteSpace: 'normal' }}>
            {`${index + 1}. ${question.question}`}
            {question.is_require === 1 && <span style={{ color: 'red', marginLeft: '5px' }}> *</span>}
          </Paragraph>
        }
      >
        <Select 
          style={{ width: '100%' }} 
          placeholder="Select an option"
          onChange={(value) => handleAnswer(question.question_id, value)}
          value={currentSectionAnswers[question.question_id]}
        >
          {question.responses.map(option => (
            <Option key={option.response_id} value={option.response_id.toString()}>{option.response}</Option>
          ))}
        </Select>
      </Card>
    );
  };

  if (result) {
    const riskLevelColor = {
      low: '#52c41a',
      medium: '#faad14',
      high: '#f5222d'
    };

    return (
      <Row justify="center">
        <Col xs={24} sm={24} md={20} lg={18} xl={16}>
          <Card className="result-card">
            <Title level={2}>Assessment Result</Title>
            <Paragraph>
              Thank you for completing the assessment. Based on your responses, we have generated a personalized report. Please remember that this is not a medical diagnosis, but rather a tool to help you understand your current situation better.
            </Paragraph>
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Risk Level"
                  value={result.predicted_risk_level.toUpperCase()}
                  valueStyle={{ color: riskLevelColor[result.predicted_risk_level] }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Risk Probability"
                  value={`${(result.class_probability * 100).toFixed(2)}%`}
                  valueStyle={{ color: riskLevelColor[result.predicted_risk_level] }}
                />
              </Col>
            </Row>
            <Divider />
            <Title level={4}>Suggestion:</Title>
            <Paragraph>{result.suggestion}</Paragraph>
            {result.possible_effect && result.possible_effect.length > 0 && (
              <>
                <Divider />
                <Title level={4}>Possible Effects:</Title>
                <List
                  dataSource={result.possible_effect}
                  renderItem={(item, index) => (
                    <List.Item>
                      <Typography.Text mark>[Effect {index + 1}]</Typography.Text> {item.effect_description}
                    </List.Item>
                  )}
                />
              </>
            )}
            <Button 
              type="primary" 
              onClick={returnToHome}
              style={{ marginTop: '20px', width: '100%' }}
            >
              Return to Home
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={20} lg={18} xl={16}>
        <div ref={topRef} className="stress-assess">
          <Card className="assessment-card">
            <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', color: '#1E3A8A' }}>Stress Assessment</Title>
            <Progress 
              percent={progress} 
              status="active" 
              style={{ marginBottom: '30px' }} 
              format={percent => `${Math.floor(percent)}%`}
            />
            {questionnaire.length > 0 ? (
              <>
                <Title level={3} style={{ marginBottom: '20px', color: '#4B5563' }}>
                  Section {currentSection}: {questionnaire[currentSection - 1]?.section_name}
                </Title>
                <TransitionGroup>
                  {questionnaire[currentSection - 1]?.questions.map((question, index) => (
                    <CSSTransition
                      key={question.question_id}
                      timeout={500}
                      classNames="question-transition"
                    >
                      <div>
                        {renderQuestion(question, index)}
                        {index < questionnaire[currentSection - 1].questions.length - 1 && <Divider style={{ margin: '20px 0' }} />}
                      </div>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
                <Row gutter={16} style={{ marginTop: '30px' }}>
                  <Col span={12}>
                    <Button 
                      onClick={prevSection} 
                      style={{ width: '100%', height: '40px', fontSize: '16px' }}
                      disabled={currentSection === 1}
                    >
                      Previous Section
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button 
                      type="primary" 
                      onClick={nextSection} 
                      style={{ width: '100%', height: '40px', fontSize: '16px' }}
                      disabled={questionnaire.length === 0}
                    >
                      {currentSection < questionnaire.length ? "Next Section" : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <Paragraph>No questions available.</Paragraph>
            )}
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default StressAssess;
