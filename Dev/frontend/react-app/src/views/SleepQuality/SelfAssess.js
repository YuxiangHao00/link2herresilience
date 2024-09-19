import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import './SelfAssess.css';
import e1 from '../../images/SQ/SQ_SA_e1.png';
import e2 from '../../images/SQ/SQ_SA_e2.png';
import e3 from '../../images/SQ/SQ_SA_e3.png';
import { useNavigate } from 'react-router-dom';
import SleepQualityGauge from './SleepQualityComponent';
import Exp1 from '../../images/SQ/SQ_SA_Exp_1.png';
import Exp2 from '../../images/SQ/SQ_SA_Exp_2.png';

const SelfAssess = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [sleepDuration, setSleepDuration] = useState('');
  const [sleepStartTime, setSleepStartTime] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [updateKey, setUpdateKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [heartRateError, setHeartRateError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [stressLevelError, setStressLevelError] = useState('');

  // Universal input handler
  // const handleInputChange = (setter) => (e) => {
  //   const value = e.target.value;
  //   if (/^\d*$/.test(value)) {
  //     // Prevent leading multiple zeros
  //     if (value === '' || !/^0{2,}/.test(value)) {
  //       setter(value);
  //     }
  //   }
  // };

  // Handle sleep duration input with one decimal place
  const handleSleepDurationChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,2}(\.\d{0,1})?$/.test(value)) {
      const numValue = parseFloat(value);
      if (value === '' || (numValue > 0 && numValue <= 24)) {
        setSleepDuration(value);
      }
    }
  };

  // Handle sleep start time change
  const handleSleepStartTimeChange = (e) => {
    setSleepStartTime(e.target.value);
  };

  //Handle input handler for heart rate
  const handleHeartRateChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value === '' || !/^0{2,}/.test(value)) {
        const numValue = parseInt(value, 10);
        if (numValue > 140) {
          setHeartRate('');
          setHeartRateError('Heart rate should be between 40 and 140');
        } else {
          setHeartRate(value);
          setHeartRateError('');
        }
      }
    }
  };

  // Handle age input
  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value === '' || !/^0{2,}/.test(value)) {
        const numValue = parseInt(value, 10);
        if (numValue > 150) {
          setAge('');
          setAgeError('Age should be between 0 and 150');
        } else {
          setAge(value);
          setAgeError('');
        }
      }
    }
  };

  // Handle stress level input
  const handleStressLevelChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value === '' || !/^0{2,}/.test(value)) {
        const numValue = parseInt(value, 10);
        if (numValue > 10) {
          setStressLevel('');
          setStressLevelError('Stress level should be between 0 and 10');
        } else {
          setStressLevel(value);
          setStressLevelError('');
        }
      }
    }
  };

  // Assess sleep quality by calling the backend API
  const handleAssess = async () => {
    if (!sleepDuration || !sleepStartTime) {
      setError('Please enter sleep duration and start time');
      return;
    }

    // Validate inputs
    if (age && (parseInt(age) < 0 || parseInt(age) > 150)) {
      setError('Age must be between 0 and 150');
      return;
    }
    if (stressLevel && (parseInt(stressLevel) < 0 || parseInt(stressLevel) > 10)) {
      setError('Stress level must be between 0 and 10');
      return;
    }
    if (heartRate && (parseInt(heartRate) < 40 || parseInt(heartRate) > 140)) {
      setError('Heart rate must be between 40 and 140');
      return;
    }

    setError('');
    setLoading(true);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const day = yesterday.getDay() === 0 ? 7 : yesterday.getDay();

    let start = '0000';
    if (sleepStartTime) {
      const [hours, minutes] = sleepStartTime.split(':');
      start = hours.padStart(2, '0') + minutes.padStart(2, '0');
    }

    let params = new URLSearchParams({
      days: `[${day}]`,
      start: `[${start}]`,
      durations: `[${parseFloat(sleepDuration)}]`,
    });

    if (age) params.append('age', age);
    if (stressLevel) params.append('stress_levels', `[${stressLevel}]`);
    if (heartRate) params.append('heart_rates', `[${heartRate}]`);

    try {
      const response = await axios.get(`https://link2herresilience.com.au/sleep_quality/v1.1/analyse?${params.toString()}`);
      setResult(response.data);
      setUpdateKey(prevKey => prevKey + 1);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while analyzing. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Renders sleep quality result
  const renderResult = () => {
    if (!result) return null;

    const qualityData = result.quality_category[0].quality;
    let qualityColor;
    switch (qualityData.category) {
      case 'GOOD':
        qualityColor = '#4CAF50';
        break;
      case 'NORMAL':
        qualityColor = '#FFC107';
        break;
      case 'BAD':
        qualityColor = '#F44336';
        break;
      default:
        qualityColor = 'black';
    }

    return (
      <div className="result-container">
        <h3>Sleep Quality Analysis Result:</h3>
        <div className="gauge-container">
          <SleepQualityGauge
            key={updateKey}
            overallQualityMean={result.overall_quality_mean}
            thresholdLow={result.threshold_low}
            thresholdHigh={result.threshold_high}
            category={result.overall_quality}
          />
        </div>
        <p>Quality Category: <span style={{ color: qualityColor, fontWeight: 'bold' }}>{qualityData.category}</span></p>
        <p>Ratio in Sample Population: {(qualityData.fraction * 100).toFixed(3)}%</p>
        <p>Suggestion: {qualityData.suggestion}</p>
      </div>
    );
  };

  // Form validation and button disabling logic
  useEffect(() => {
    const isValid =
      (!age || (parseInt(age) >= 0 && parseInt(age) <= 150)) &&
      (!stressLevel || (parseInt(stressLevel) >= 0 && parseInt(stressLevel) <= 10)) &&
      (!heartRate || (parseInt(heartRate) >= 40 && parseInt(heartRate) <= 140)) &&
      sleepDuration &&
      sleepStartTime;

    const assessButton = document.querySelector('.assess-button');
    if (assessButton) {
      assessButton.disabled = !isValid;
    }
  }, [age, stressLevel, heartRate, sleepDuration, sleepStartTime]);

  const handleGoBack = () => {
    navigate('/sleep-quality');
  };

  return (
    <div className="self-assess-container">
      <h1 className="title">SLEEP QUALITY</h1>
      <div className="info-cards">
        <div className="info-card">
          <img src={e1} alt="Stress Level" />
          <h3>Stress Level</h3>
          <p>Reduced stress levels aid in improving health which is inversely related to sleep quality</p>
        </div>

        <div className="info-card">
          <img src={e2} alt="Heart Rate" />
          <h3>Heart Rate</h3>
          <p>Resting heart rate of 70-72 bpm assists in better sleep</p>
        </div>

        <div className="info-card">
          <img src={e3} alt="Enough Sleep" />
          <h3>Enough Sleep</h3>
          <p>Sufficient sleep supports cognitive function, emotional well-being, and immune system function.</p>
        </div>
      </div>

      <h2 className="SA_subtitle">SELF ASSESS YOURS</h2>
      <div className="form-container">
        <div className="form-row">
          <label>
            Past night Sleep duration (hours)
            <input
              type="text"
              inputMode="decimal"
              pattern="\d*\.?\d*"
              value={sleepDuration}
              onChange={handleSleepDurationChange}
              required
              placeholder="e.g. 7.5"
            />
          </label>
          <label>
            Past night Sleep Start Time (click clock)
            <input
              type="time"
              value={sleepStartTime}
              onChange={handleSleepStartTimeChange}
              required
            />
          </label>
        </div>
        {/* <h4 className="optional-inputs-title">Optional inputs</h4> */}
        <div className="form-row">
          <label className="input-wrapper">
            Age
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={age}
              onChange={handleAgeChange}
              // placeholder="0-150"
            />
            {ageError && <p className="input-error">{ageError}</p>}
          </label>
          <label className="input-wrapper">
            Stress level (0-10)
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={stressLevel}
              onChange={handleStressLevelChange}
              placeholder="0-10"
            />
            {stressLevelError && <p className="input-error">{stressLevelError}</p>}
          </label>
          <label className="input-wrapper">
            Heart rate (40-140)
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={heartRate}
              onChange={handleHeartRateChange}
              placeholder="40-140"
            />
            {heartRateError && <p className="input-error">{heartRateError}</p>}
          </label>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <button onClick={handleAssess} className="assess-button">
            Assess
          </button>
        )}
        {error && <p className="error">{error}</p>}
        {renderResult()}
      </div>

      <Button
        className='size-btn'
        type="link"
        onClick={() => setIsModalOpen(true)}
        style={{
          background: 'none',
          padding: 0,
          fontSize: '20px',
          marginLeft: '40px',
          display: 'inline-block'
        }}
      >
        Know about data
      </Button>
      <Modal
        title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '30px' }}>Effects of poor Sleep Quality</div>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={900}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
        footer={null}
        closable={true}
      >
        <p style={{ fontWeight: 'bold' }}>Source: Australian Institute of Health & Welfare (AIHW)</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={Exp1} alt="Sleep Quality Effects 1" style={{ width: '49%', height: 'auto' }} />
          <img src={Exp2} alt="Sleep Quality Effects 2" style={{ width: '49%', height: 'auto' }} />
        </div>
      </Modal>

      <button
        onClick={handleGoBack}
        className="SA-back-button"
      >
        back
      </button>
    </div>
  );
};

export default SelfAssess;
