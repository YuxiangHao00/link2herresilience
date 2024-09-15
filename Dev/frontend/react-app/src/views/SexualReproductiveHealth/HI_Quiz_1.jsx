import React, { useState, useEffect } from 'react';
import bg from './images/bg40.png'
import '../../style.less'
import './triage.less'

const HIQuiz1 = (props) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const apiUrl = 'https://link2herresilience.com.au/health_education/v1/quiz?topic=sexual health';
    console.log('Fetching questions from API:', apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received questions data:', data);
      if (Array.isArray(data.questions)) {
        setQuestions(data.questions);
      } else {
        throw new Error('Invalid question format');
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      setError('Error fetching quiz questions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    const questionIds = questions.map(q => q.question_id);
    const answers = questionIds.map(id => selectedAnswers[id]);
    const apiUrl = `https://link2herresilience.com.au/health_education/v1/quiz?topic=sexual health&questions=[${questionIds.join(',')}]&answers=[${answers.join(',')}]`;
    console.log('Submitting quiz to API:', apiUrl);
    
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received quiz results:', data);
      setQuizResults(data);
      setQuizCompleted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Error submitting quiz: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => props.actType(2)} className="main-btn">
          Return to Module
        </button>
      </div>
    );
  }

  return (
    <div className="main-page img" style={{ backgroundImage: `url(${bg})` }}>
      <header>
        <h1 className="page-title">Finished reading? Test your understanding.</h1>
      </header>

      {!quizCompleted ? (
        <div className="quiz-container">
          {questions.length > 0 && (
            <>
              <h2>Question {currentQuestion + 1} / {questions.length}</h2>
              <h3>{questions[currentQuestion].question}</h3>
              {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleAnswerSelect(questions[currentQuestion].question_id, key)}
                  className={`quiz-option ${selectedAnswers[questions[currentQuestion].question_id] === key ? 'selected' : ''}`}
                >
                  {key}. {value}
                </button>
              ))}
              <button 
                onClick={handleNextQuestion} 
                disabled={!selectedAnswers[questions[currentQuestion].question_id]} 
                className="next-button"
              >
                {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="quiz-results">
          <h2>Quiz Completed!</h2>
          {quizResults && (
            <>
              <p>Your score: {quizResults.score} / {questions.length}</p>
              <p>Percentage: {quizResults.percentage}%</p>
              {questions.map((question, index) => (
                <div key={index} className={`result-detail ${quizResults.details[index].is_right ? 'correct' : 'incorrect'}`}>
                  <h3>Question {index + 1}: {question.question}</h3>
                  {Object.entries(question.options).map(([key, value]) => (
                    <p key={key} className={`option ${selectedAnswers[question.question_id] === key ? 'selected' : ''} ${key === quizResults.details[index].correct_answer ? 'correct' : ''}`}>
                      {key}. {value} {selectedAnswers[question.question_id] === key ? '(Your choice)' : ''} {key === quizResults.details[index].correct_answer ? '(Correct answer)' : ''}
                    </p>
                  ))}
                  <hr className="answer-explanation-divider" />
                  <p>{quizResults.details[index].response}</p>
                </div>
              ))}
            </>
          )}
          <button onClick={() => props.actType(2)} className="main-btn">
            Return to Module
          </button>
        </div>
      )}
    </div>
  );
};

export default HIQuiz1;