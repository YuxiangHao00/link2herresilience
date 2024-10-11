import React, { useState, useEffect, useRef } from 'react';
import { Typography, Radio, Select, Button, Space, Progress, Card, Divider, Row, Col, message, Tag } from 'antd';
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
  const [progress, setProgress] = useState(0);
  const [questionnaire, setQuestionnaire] = useState(questionnaireData);
  const [sessionId, setSessionId] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const topRef = useRef(null);

  useEffect(() => {
    setSessionId(uuidv4().substring(0, 8));
    console.log('Questionnaire data:', questionnaire);
  }, []);

  useEffect(() => {
    if (questionnaire.length > 0) {
      // 修改这里，使用 Math.floor 来向下取整
      setProgress(Math.floor((currentSection - 1) / questionnaire.length * 100));
    }
  }, [currentSection, questionnaire]);

  const handleAnswer = (questionId, answerId) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextSection = async () => {
    const currentQuestions = questionnaire[currentSection - 1]?.questions || [];
    const unansweredRequiredQuestions = currentQuestions.filter(
      q => q.is_require === 1 && !answers[q.question_id]
    );

    if (unansweredRequiredQuestions.length > 0) {
      message.error('Please answer all required questions before proceeding.');
      return;
    }

    if (currentSection < questionnaire.length) {
      setCurrentSection(prev => prev + 1);
      // 清除下一部分的答案
      const nextSectionQuestions = questionnaire[currentSection]?.questions || [];
      const nextSectionAnswers = {};
      nextSectionQuestions.forEach(q => {
        nextSectionAnswers[q.question_id] = null;
      });
      setAnswers(prev => ({ ...prev, ...nextSectionAnswers }));
      
      // 使用 requestAnimationFrame 来确保在下一帧执行滚动
      requestAnimationFrame(() => {
        scrollToTop();
      });
    } else {
      // 提交答案
      try {
        const answeredQuestions = questionnaire.flatMap(section => 
          section.section_id !== 1 ? // 排除 Section 1
            section.questions.filter(q => answers[q.question_id])
              .map(q => ({ ...q, section_id: section.section_id }))
            : []
        );

        const sectionIds = answeredQuestions.map(q => q.section_id).join(',');
        const questionIds = answeredQuestions.map(q => q.question_id).join(',');
        const responseIds = answeredQuestions.map(q => answers[q.question_id]).join(',');

        // 添加详细的日志输出
        console.log('API Call Details:');
        console.log('Answered Questions:', JSON.stringify(answeredQuestions, null, 2));
        console.log('Section IDs:', sectionIds);
        console.log('Question IDs:', questionIds);
        console.log('Response IDs:', responseIds);

        const baseUrl = 'https://link2herresilience.com.au/lifestyle/v1/analyse_risk';
        // http://127.0.0.1:5008/lifestyle/v1/analyse_risk
        // https://link2herresilience.com.au/lifestyle/v1/analyse_risk
        const params = new URLSearchParams({
          session_id: sessionId,
          section_id: `[${sectionIds}]`,
          question_id: `[${questionIds}]`,
          response_id: `[${responseIds}]`
        });
        const url = `${baseUrl}?${params}`;

        console.log('Full API URL:', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // 添加响应日志
        console.log('API Response Status:', response.status);
        const responseText = await response.text();
        console.log('API Response Text:', responseText);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
        }

        const data = JSON.parse(responseText);
        console.log('Parsed API Response:', JSON.stringify(data, null, 2));
        setResult(data);
      } catch (error) {
        console.error('Error submitting answers:', error);
        console.error('Error details:', error.message);
        message.error(`An error occurred: ${error.message}`);
      }
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(prev => prev - 1);
      // 清除当前部分的答案
      const currentSectionQuestions = questionnaire[currentSection - 1]?.questions || [];
      const currentSectionAnswers = {};
      currentSectionQuestions.forEach(q => {
        currentSectionAnswers[q.question_id] = null;
      });
      setAnswers(prev => ({ ...prev, ...currentSectionAnswers }));
      
      // 使用 requestAnimationFrame 来确保在下一帧执行滚动
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
        className="question-card"
        title={
          <Paragraph strong style={{ fontSize: '16px', marginBottom: '10px', whiteSpace: 'normal' }}>
            {`${index + 1}. ${question.question}`}
            {question.is_require === 1 && <span style={{ color: 'red' }}> *</span>}
          </Paragraph>
        }
      >
        <Select 
          style={{ width: '100%' }} 
          placeholder="Select an option"
          onChange={(value) => handleAnswer(question.question_id, value)}
          value={answers[question.question_id] || undefined}
        >
          {question.responses.map(option => (
            <Option key={option.response_id} value={option.response_id.toString()}>{option.response}</Option>
          ))}
        </Select>
      </Card>
    );
  };

  if (result) {
    const getRiskColor = (level) => {
      switch (level) {
        case 'low': return 'success';
        case 'medium': return 'warning';
        case 'high': return 'error';
        default: return 'default';
      }
    };

    const getRiskIcon = (level) => {
      switch (level) {
        case 'low': return <CheckCircleOutlined />;
        case 'medium': return <WarningOutlined />;
        case 'high': return <CloseCircleOutlined />;
        default: return null;
      }
    };

    // 添加一个安全检查
    const riskLevel = result.predicted_risk_level ? result.predicted_risk_level.toLowerCase() : 'unknown';
    const riskLevelCapitalized = riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);

    return (
      <Row justify="center">
        <Col xs={24} sm={24} md={20} lg={18} xl={16}>
          <Card className="result-card">
            <Title level={2}>Assessment Result</Title>
            <Row gutter={[16, 16]} align="middle">
              <Col span={12}>
                <Tag icon={getRiskIcon(riskLevel)} color={getRiskColor(riskLevel)} style={{ padding: '8px 16px', fontSize: '18px' }}>
                  Risk Level: {riskLevelCapitalized}
                </Tag>
              </Col>
              <Col span={12}>
                <Progress
                  type="circle"
                  percent={Math.round((result.class_probability || 0) * 100)}
                  format={(percent) => `${percent}%`}
                  width={80}
                  status={getRiskColor(riskLevel)}
                />
              </Col>
            </Row>
            <Paragraph style={{ marginTop: '20px', fontSize: '16px' }}>
              <strong>Suggestion:</strong> {result.suggestion || 'No suggestion available.'}
            </Paragraph>
            {result.possible_effect && (
              <Paragraph style={{ marginTop: '20px', fontSize: '16px' }}>
                <strong>Possible Effect:</strong> {result.possible_effect}
              </Paragraph>
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