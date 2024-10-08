import React, { useState, useEffect } from 'react';
import { Typography, Radio, Select, Button, Space, Progress, Card, Divider, Row, Col } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './addiction.less';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const StressAssess = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [progress, setProgress] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);

  const sections = {
    1: [
      { 
        question: "What is your age range?", 
        type: "select",
        options: ["18-24", "25-34", "35-44", "45+"]
      },
      { 
        question: "How do you identify your gender?", 
        type: "select",
        options: ["Male", "Female", "Non-binary", "Prefer not to say"]
      },
      {
        question: "What is your current occupation?",
        type: "select",
        options: ["Student", "Employed", "Self-employed", "Unemployed", "Other"]
      },
      {
        question: "What is your migration status?",
        type: "select",
        options: ["Student", "Permanent Resident", "Temporary Resident", "Refugee", "Other"]
      },
      {
        question: "How long have you been living in Australia?",
        type: "select",
        options: ["Less than 6 months", "6 months to 1 year", "1-3 years", "More than 3 years"]
      },
      {
        question: "What is your highest level of education?",
        type: "select",
        options: ["High school", "Undergraduate", "Graduate", "Other"]
      }
    ],
    2: [
      {
        question: "On a scale of 1-10, how often do you feel stressed on a daily basis?",
        type: "radio",
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      {
        question: "How often do you feel overwhelmed during stressful situations?",
        type: "select",
        options: ["Never", "Sometimes", "Often", "Always"],
        condition: (answers) => answers["On a scale of 1-10, how often do you feel stressed on a daily basis?"] >= 7
      },
      {
        question: "On a scale of 1-10, how often do you feel anxious or worried?",
        type: "radio",
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      {
        question: "Have you ever felt physically unwell when stopping alcohol or substance use?",
        type: "select",
        options: ["Never", "Occasionally", "Frequently", "Always"],
        condition: (answers) => answers["On a scale of 1-10, how often do you feel anxious or worried?"] >= 7
      },
      {
        question: "How often do you consume alcohol?",
        type: "select",
        options: ["Never", "Once a month", "Once a week", "Multiple times a week"]
      },
      {
        question: "How in control do you feel over your alcohol or substance use?",
        type: "select",
        options: ["Completely in control", "Somewhat in control", "Not in control"],
        condition: (answers) => ["Once a week", "Multiple times a week"].includes(answers["How often do you consume alcohol?"])
      },
      {
        question: "Do you use recreational drugs?",
        type: "select",
        options: ["Yes", "No", "Prefer not to say"]
      },
      {
        question: "Have you ever tried to cut back on alcohol or substance use but found it difficult?",
        type: "select",
        options: ["Never", "Once or twice", "Frequently", "Always"],
        condition: (answers) => answers["Do you use recreational drugs?"] === "Yes"
      },
      {
        question: "How easy is it for you to obtain alcohol or recreational substances?",
        type: "select",
        options: ["Not easy", "Somewhat easy", "Very easy"]
      }
    ],
    3: [
      {
        question: "How often do you attend social gatherings?",
        type: "select",
        options: ["Rarely", "Once a month", "Once a week", "More than once a week"]
      },
      {
        question: "Do you feel pressured by others to drink alcohol or use substances?",
        type: "select",
        options: ["Never", "Sometimes", "Often", "Always"],
        condition: (answers) => ["Once a week", "More than once a week"].includes(answers["How often do you attend social gatherings?"])
      },
      {
        question: "How often do you exercise?",
        type: "select",
        options: ["Never", "Once a week", "Multiple times a week", "Daily"]
      },
      {
        question: "Have you noticed changes in your routine, like skipping meals or avoiding exercise due to substance use?",
        type: "select",
        options: ["No", "Occasionally", "Frequently", "Always"],
        condition: (answers) => answers["How often do you exercise?"] === "Never"
      },
      {
        question: "How many hours do you usually sleep at night?",
        type: "select",
        options: ["Less than 5", "5-7", "7-9", "More than 9"]
      },
      {
        question: "How often does alcohol or substance use disrupt your sleep?",
        type: "select",
        options: ["Never", "Occasionally", "Frequently", "Always"],
        condition: (answers) => ["Less than 5", "5-7"].includes(answers["How many hours do you usually sleep at night?"])
      },
      {
        question: "How would you describe your diet?",
        type: "select",
        options: ["Healthy", "Average", "Unhealthy"]
      }
    ],
    4: [
      {
        question: "When stressed, how do you usually cope?",
        type: "select",
        options: ["Exercise", "Meditation", "Alcohol", "Drugs", "Talking to friends", "Other"]
      },
      {
        question: "How often do you regret using alcohol or substances to manage stress?",
        type: "select",
        options: ["Never", "Sometimes", "Often", "Always"],
        condition: (answers) => ["Alcohol", "Drugs"].includes(answers["When stressed, how do you usually cope?"])
      },
      {
        question: "How would you rate your work/life balance?",
        type: "select",
        options: ["Very poor", "Poor", "Average", "Good", "Excellent"]
      },
      {
        question: "How often do you use alcohol or substances as a 'reward' after a tough day?",
        type: "select",
        options: ["Never", "Occasionally", "Frequently", "Always"],
        condition: (answers) => ["Very poor", "Poor"].includes(answers["How would you rate your work/life balance?"])
      },
      {
        question: "How often do you practice mindfulness or self-reflection (e.g., journaling, meditation) to manage stress?",
        type: "select",
        options: ["Never", "Occasionally", "Frequently", "Always"]
      }
    ],
    5: [
      {
        question: "Do your close friends or family regularly consume alcohol or use substances?",
        type: "select",
        options: ["Yes", "No", "Sometimes"]
      },
      {
        question: "Do you think substance use is common in your community?",
        type: "select",
        options: ["Yes", "No", "Not sure"],
        condition: (answers) => ["Yes", "Sometimes"].includes(answers["Do your close friends or family regularly consume alcohol or use substances?"])
      },
      {
        question: "Do you have someone to talk to when you feel stressed or anxious?",
        type: "select",
        options: ["Yes", "No", "Sometimes"]
      }
    ],
    6: [
      {
        question: "Have you ever sought professional help for stress or anxiety?",
        type: "select",
        options: ["Yes", "No", "Considering it"]
      },
      {
        question: "Have you taken any actions to prevent or reduce stress, anxiety, or substance use in the past 6 months?",
        type: "select",
        options: ["Yes", "No", "Considering it"],
        condition: (answers) => answers["Have you ever sought professional help for stress or anxiety?"] === "Yes"
      },
      {
        question: "Do you have family or close friends who support you emotionally?",
        type: "select",
        options: ["Yes", "No", "Sometimes"]
      }
    ]
  };

  useEffect(() => {
    updateCurrentQuestions();
  }, [currentSection, answers]);

  const updateCurrentQuestions = () => {
    const sectionQuestions = sections[currentSection];
    const filteredQuestions = sectionQuestions.filter(q => !q.condition || q.condition(answers));
    setCurrentQuestions(filteredQuestions);
  };

  const handleAnswer = (question, answer) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const nextSection = () => {
    if (currentSection < Object.keys(sections).length) {
      setCurrentSection(prev => prev + 1);
      setProgress(prev => prev + (100 / Object.keys(sections).length));
    } else {
      // Submit answers or navigate to results page
      console.log(answers);
    }
  };

  const formatPercent = (percent) => {
    return `${Math.round(percent)}%`;
  };

  const renderQuestion = (question) => {
    return (
      <Card 
        className="question-card"
        title={
          <Paragraph strong style={{ fontSize: '16px', marginBottom: '10px', whiteSpace: 'normal' }}>
            {question.question.split(' ').reduce((acc, word, index) => {
              if (index % 8 === 0 && index !== 0) {
                return [...acc, <br key={index} />, word];
              }
              return [...acc, ' ', word];
            }, [])}
          </Paragraph>
        }
      >
        {renderQuestionContent(question)}
      </Card>
    );
  };

  const renderQuestionContent = (question) => {
    switch (question.type) {
      case 'select':
        return (
          <Select 
            style={{ width: '100%' }} 
            placeholder="Select an option"
            onChange={(value) => handleAnswer(question.question, value)}
          >
            {question.options.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        );
      case 'radio':
        return (
          <Radio.Group 
            onChange={(e) => handleAnswer(question.question, e.target.value)}
            className={question.options.length === 10 ? "scale-options" : ""}
          >
            {question.options.length === 10 ? (
              <div className="scale-container">
                {question.options.map(option => (
                  <div key={option} className="scale-item">
                    <Radio value={option} />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            ) : (
              <Space direction="vertical">
                {question.options.map(option => (
                  <Radio key={option} value={option}>{option}</Radio>
                ))}
              </Space>
            )}
          </Radio.Group>
        );
      default:
        return null;
    }
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={20} lg={18} xl={16}>
        <div className="stress-assess">
          <Card className="assessment-card">
            <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', color: '#1E3A8A' }}>Stress Assessment</Title>
            <Progress percent={progress} status="active" style={{ marginBottom: '30px' }} format={formatPercent} />
            <Title level={3} style={{ marginBottom: '20px', color: '#4B5563' }}>Section {currentSection}: {getSectionTitle(currentSection)}</Title>
            <TransitionGroup>
              {currentQuestions.map((question, index) => (
                <CSSTransition
                  key={question.question}
                  timeout={500}
                  classNames="question-transition"
                >
                  <div>
                    {renderQuestion(question)}
                    {index < currentQuestions.length - 1 && <Divider style={{ margin: '20px 0' }} />}
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
            <Button 
              type="primary" 
              onClick={nextSection} 
              style={{ marginTop: '30px', width: '100%', height: '40px', fontSize: '16px' }}
            >
              {currentSection < Object.keys(sections).length ? "Next Section" : "Submit"}
            </Button>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

function getSectionTitle(sectionNumber) {
  const titles = [
    "Demographic Information",
    "Behavioral Patterns",
    "Social and Lifestyle Choices",
    "Mental and Emotional Well-Being",
    "Community and Environmental Factors",
    "Mental Health Awareness"
  ];
  return titles[sectionNumber - 1];
}

export default StressAssess;