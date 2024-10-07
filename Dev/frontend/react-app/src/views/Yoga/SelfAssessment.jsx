import React, { useState, useEffect } from 'react';
import './yoga.less';

const questions = [
  {
    id: 1,
    text: "Has your medical practitioner ever told you that you have a heart condition or have you ever suffered a stroke?",
    tooltip: "Heart conditions include, but are not limited to: post myocardial infarction (heart attack), angina, coronary artery bypass,coronary angioplasty, heart failure, cardiomyopathy, heart transplant, pacemaker insertion, congenital heart disease, heartvalve disease, and peripheral arterial disease."    
  },
  {
    id: 2,
    text: "Do you ever experience unexplained pains or discomfort in your chest at rest or during physical activity/exercise?",
    tooltip: "Any unexplained chest pains, characterised by: constriction, burning, knifelike pains, and/or dull ache."
  },
  {
    id: 3,
    text: "Do you ever feel faint, dizzy or lose balance during physical activity/exercise?",
    tooltip: "There are many causes of feeling faint or dizzy. Examples of dizziness may include, but are not limited to: light-headedness or the feeling of nearly fainting, loss of balance or other sensations such as floating or swimming. This question is attempting to identify individuals with conditions such as blood pressure regulation problems (e.g. orthostatic hypotension) or cardiac arrhythmias. Although dizziness after exercise should not always be ignored, this may occur even in healthy individuals. Dizziness after exercise may not always indicate a serious medical issue."
  },
  {
    id: 4,
    text: "Have you had an asthma attack requiring immediate medical attention at any time over the last 12 months?",
    tooltip: "Medical attention refers to a medical practitioner or hospital visit following an asthma attack. It does not include the self-administration of medications prescribed for asthma."
  },
  {
    id: 5,
    text: "If you have diabetes (type 1 or 2) have you had trouble controlling your blood sugar (glucose) in the last 3 months?",
    tooltip: "Trouble controlling blood sugar refers to suffering from hyperglycaemia (high) or hypoglycaemia (low). Abnormal blood sugar levels may impede the individual’s ability to exercise. In addition, participants with diabetes have anincreased risk for coronary artery disease and can have a reduced ability to feel chest pain (silent angina). It is important to consider blood sugar levels and risk for coronary artery disease in patients with diabetes."
  },
  {
    id: 6,
    text: "Do you have any other conditions that may require special consideration for you to exercise?",
    tooltip: "Examples include: acute injury, pregnancy, epilepsy, transplants, and cancer."
  },
];

export default function SelfAssessment() {
  const [answers, setAnswers] = useState({});
  const [showInsight, setShowInsight] = useState(false);
  const [showActivityQuestion, setShowActivityQuestion] = useState(false);
  const [activityLevels, setActivityLevels] = useState({
    light: { frequency: '', duration: '' },
    moderate: { frequency: '', duration: '' },
    vigorous: { frequency: '', duration: '' },
  });
  const [assessmentResult, setAssessmentResult] = useState('');
  const [isAssessButtonDisabled, setIsAssessButtonDisabled] = useState(true);

  useEffect(() => {
    const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);
    const activityQuestionFilled = !showActivityQuestion || (
      Object.values(activityLevels).every(level => 
        level.frequency !== '' && level.duration !== ''
      )
    );
    setIsAssessButtonDisabled(!(allQuestionsAnswered && activityQuestionFilled));
  }, [answers, showActivityQuestion, activityLevels]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    if (answer === 'No') {
      setShowActivityQuestion(true);
    } else {
      setShowActivityQuestion(false);
      setActivityLevels({
        light: { frequency: '', duration: '' },
        moderate: { frequency: '', duration: '' },
        vigorous: { frequency: '', duration: '' },
      });
    }
  };

  const handleActivityChange = (intensity, field, value) => {
    // 确保输入的值不小于 0
    const sanitizedValue = Math.max(0, parseInt(value) || 0);
    setActivityLevels(prev => ({
      ...prev,
      [intensity]: { ...prev[intensity], [field]: sanitizedValue.toString() }
    }));
  };

  const calculateTotalMinutes = () => {
    const light = parseInt(activityLevels.light.frequency) * parseInt(activityLevels.light.duration) || 0;
    const moderate = parseInt(activityLevels.moderate.frequency) * parseInt(activityLevels.moderate.duration) || 0;
    const vigorous = parseInt(activityLevels.vigorous.frequency) * parseInt(activityLevels.vigorous.duration) || 0;
    return (light + moderate) + (2 * vigorous);
  };

  const handleAssess = () => {
    const allYes = Object.values(answers).every(answer => answer === 'Yes');
    if (allYes) {
      setShowInsight(true);
      setAssessmentResult('');
    } else {
      const totalMinutes = calculateTotalMinutes();
      if (totalMinutes < 150) {
        setAssessmentResult('Light to moderate intensity exercise is recommended. Increase your volume and intensity slowly.');
      } else {
        setAssessmentResult('Continue with your current physical activity/exercise levels.');
      }
      setShowInsight(false);
    }
  };

  return (
    <div className="self-assessment">
      <p className="intro-text">
        A <strong>sick & restless</strong> human <strong>disperses pranas</strong>, whereas <strong>peaceful & healthy</strong> person keeps 
        <strong> pranas within</strong> the body & live a good life!
      </p>
      <h2>Self-assess risk associated with yoga & exercise</h2>
      <div className="questions">
        {questions.map((question) => (
          <div key={question.id} className="question">
            <p>
              {question.text}
              <span className="info-icon" title={question.tooltip}>ⓘ</span>
            </p>
            <div className="answers">
              <button 
                className={answers[question.id] === 'Yes' ? 'active' : ''}
                onClick={() => handleAnswer(question.id, 'Yes')}
              >
                Yes
              </button>
              <button 
                className={answers[question.id] === 'No' ? 'active' : ''}
                onClick={() => handleAnswer(question.id, 'No')}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>
      {showActivityQuestion && (
        <div className="activity-question">
          <h3>Describe your current physical activity/exercise levels in a typical week by stating the frequency and duration at the different intensities.</h3>
          <table className="activity-table">
            <thead>
              <tr>
                <th>Intensity</th>
                <th>Light</th>
                <th>Moderate</th>
                <th>Vigorous/High</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Frequency (number of sessions per week)</td>
                <td><input type="number" min="0" value={activityLevels.light.frequency} onChange={(e) => handleActivityChange('light', 'frequency', e.target.value)} /></td>
                <td><input type="number" min="0" value={activityLevels.moderate.frequency} onChange={(e) => handleActivityChange('moderate', 'frequency', e.target.value)} /></td>
                <td><input type="number" min="0" value={activityLevels.vigorous.frequency} onChange={(e) => handleActivityChange('vigorous', 'frequency', e.target.value)} /></td>
              </tr>
              <tr>
                <td>Duration (total minutes per week)</td>
                <td><input type="number" min="0" value={activityLevels.light.duration} onChange={(e) => handleActivityChange('light', 'duration', e.target.value)} /></td>
                <td><input type="number" min="0" value={activityLevels.moderate.duration} onChange={(e) => handleActivityChange('moderate', 'duration', e.target.value)} /></td>
                <td><input type="number" min="0" value={activityLevels.vigorous.duration} onChange={(e) => handleActivityChange('vigorous', 'duration', e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <button className="assess-button" onClick={handleAssess} disabled={isAssessButtonDisabled}>
        Assess
      </button>
      {showInsight && (
        <div className="insight-box">
          <h3>INSIGHT:</h3>
          <p>Please seek guidance from an appropriate allied health professional or medical practitioner prior to undertaking exercise.</p>
        </div>
      )}
      {assessmentResult && (
        <div className="assessment-result">
          <h3>Assessment Result:</h3>
          <p>{assessmentResult}</p>
        </div>
      )}
    </div>
  );
}