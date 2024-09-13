import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SleepPattern.css';

const SleepPattern = () => {
  const initialPatterns = [
    { start: null, end: null },
    { start: null, end: null },
    { start: null, end: null }
  ];

  const [patterns, setPatterns] = useState(initialPatterns);
  const [isAnalyzeEnabled, setIsAnalyzeEnabled] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  });
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  useEffect(() => {
    const allPatternsComplete = patterns.every(pattern => pattern.start !== null && pattern.end !== null);
    setIsAnalyzeEnabled(allPatternsComplete && !isAnalyzed);
  }, [patterns, isAnalyzed]);

  const addPattern = () => {
    if (patterns.length < 7) {
      setPatterns([...patterns, { start: null, end: null }]);
    }
  };

  const removePattern = () => {
    if (patterns.length > 3) {
      setPatterns(patterns.slice(0, -1));
    }
  };

  const clearPattern = (index) => {
    const updatedPatterns = [...patterns];
    updatedPatterns[index] = { start: null, end: null };
    setPatterns(updatedPatterns);
    setAnalysisResults(prev => {
      const newResults = [...prev];
      newResults[index] = null;
      return newResults;
    });
  };

  const handleTimeSelection = (index, time) => {
    if (isAnalyzed) return;
    const updatedPatterns = [...patterns];
    const currentPattern = updatedPatterns[index];

    if (currentPattern.start === null) {
      currentPattern.start = time;
    } else if (currentPattern.end === null) {
      currentPattern.end = time;
    } else {
      currentPattern.start = time;
      currentPattern.end = null;
    }

    setPatterns(updatedPatterns);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const calculateDuration = (start, end) => {
    if (start === null || end === null) return '0h 0m';
    
    let duration = end >= start ? end - start : 24 - start + end;
    
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    
    return `${hours}h ${minutes}m`;
  };

  const calculateTotalSleepTime = () => {
    let totalHours = 0;
    let totalMinutes = 0;

    patterns.forEach(pattern => {
      if (pattern.start !== null && pattern.end !== null) {
        const duration = calculateDuration(pattern.start, pattern.end);
        const [hours, minutes] = duration.split('h ');
        totalHours += parseInt(hours);
        totalMinutes += parseInt(minutes);
      }
    });

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    return `${totalHours}h ${totalMinutes}m`;
  };

  const getDayName = (index) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[(currentDate.getDay() - index + 7) % 7];
  };

  const getFormattedDate = (index) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - index);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleAnalyze = async () => {
    const validPatterns = patterns.filter(pattern => pattern.start !== null && pattern.end !== null);
    
    if (validPatterns.length === 0) {
      console.error('No valid sleep patterns to analyze');
      return;
    }

    const days = validPatterns.map((_, index) => {
      const day = (currentDate.getDay() - index + 7) % 7;
      return day === 0 ? 7 : day;
    }).reverse();

    const start = validPatterns.map(pattern => {
      const hours = Math.floor(pattern.start);
      const minutes = Math.round((pattern.start - hours) * 60);
      return `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}`;
    }).reverse();

    const durations = validPatterns.map(pattern => {
      let duration = pattern.end >= pattern.start ? pattern.end - pattern.start : 24 - pattern.start + pattern.end;
      return Number(duration.toFixed(1));
    }).reverse();

    const params = new URLSearchParams({
      days: `[${days.join(',')}]`,
      start: `[${start.join(',')}]`,
      durations: `[${durations.join(',')}]`
    });

    console.log('API request URL:', `https://link2herresilience.com.au/sleep_quality/v1/analyse?${params.toString()}`);

    try {
      const response = await axios.get(`https://link2herresilience.com.au/sleep_quality/v1/analyse?${params.toString()}`);
      console.log('API response:', response.data);
      setAnalysisResults(response.data.quality_category);
      setIsAnalyzed(true);
    } catch (error) {
      console.error('Error analyzing sleep patterns:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
    }
  };

  const handleReset = () => {
    setPatterns(initialPatterns);
    setAnalysisResults([]);
    setIsAnalyzed(false);
    setCurrentDate(() => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    });
  };

  const renderPatternRow = (pattern, index) => {
    const hours = Array.from({ length: 48 }, (_, i) => (i * 0.5 + 18) % 24);
    const duration = calculateDuration(pattern.start, pattern.end);
    const quality = analysisResults[index];
    const colorClass = quality ? (quality === 'GOOD' ? 'good' : 'bad') : '';
    return (
      <div key={index} className="pattern-row">
        <div className="pattern-label">
          <div>{getDayName(index)}</div>
          <div className="date-label">{getFormattedDate(index)}</div>
        </div>
        <div className="pattern-content">
          <div className="time-blocks">
            {hours.map((time) => (
              <div
                key={time}
                className={`time-block ${
                  (pattern.start !== null && pattern.end !== null &&
                    ((pattern.start <= pattern.end && time >= pattern.start && time < pattern.end) ||
                     (pattern.start > pattern.end && (time >= pattern.start || time < pattern.end))))
                    ? `selected ${colorClass}`
                    : pattern.start === time
                    ? 'start'
                    : ''
                }`}
                onClick={() => handleTimeSelection(index, time)}
                title={`${formatTime(time)}`}
              />
            ))}
          </div>
          <div className="pattern-info">
            <span>
              {pattern.start !== null && pattern.end === null ? (
                `Start: ${formatTime(pattern.start)} - Click to select end time`
              ) : pattern.start !== null && pattern.end !== null ? (
                `Sleep: ${formatTime(pattern.start)} - ${formatTime(pattern.end)} (${duration})`
              ) : (
                'Click to select start time'
              )}
            </span>
            <button 
              className="clear-button" 
              onClick={() => clearPattern(index)}
              disabled={isAnalyzed}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTimeScale = () => {
    const hours = Array.from({ length: 24 }, (_, i) => (i + 18) % 24);
    return (
      <div className="time-scale">
        {hours.map((hour) => (
          <div key={hour} className="time-scale-hour">
            {hour.toString().padStart(2, '0')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="sleep-pattern-wrapper">
      <div className="sleep-pattern-container">
        <h2 className="sleep-pattern-title">Sleep Pattern</h2>
        {renderTimeScale()}
        <div className="patterns-container">
          {patterns.map(renderPatternRow)}
        </div>
        <div className="total-sleep-time">
          Total sleep time: {calculateTotalSleepTime()}
        </div>
        <div className="pattern-controls">
          <button
            onClick={removePattern}
            className="control-button remove-button"
            disabled={patterns.length <= 3 || isAnalyzed}
          >
            -
          </button>
          <span className="pattern-count">{patterns.length}</span>
          <button
            onClick={addPattern}
            className="control-button add-button"
            disabled={patterns.length >= 7 || isAnalyzed}
          >
            +
          </button>
        </div>
        <div className="action-buttons">
          <button
            onClick={handleAnalyze}
            className={`action-button analyze-button ${isAnalyzeEnabled ? 'enabled' : 'disabled'}`}
            disabled={!isAnalyzeEnabled}
          >
            Analyze
          </button>
          <button
            onClick={handleReset}
            className="action-button reset-button"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SleepPattern;
