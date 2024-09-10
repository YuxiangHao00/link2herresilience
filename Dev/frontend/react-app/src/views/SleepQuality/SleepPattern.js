import React, { useState, useEffect } from 'react';
import './SleepPattern.css';

const SleepPattern = () => {
  const [patterns, setPatterns] = useState([
    { start: null, end: null },
    { start: null, end: null },
    { start: null, end: null }
  ]);

  const [isAnalyzeEnabled, setIsAnalyzeEnabled] = useState(false);

  useEffect(() => {
    const allPatternsComplete = patterns.every(pattern => pattern.start !== null && pattern.end !== null);
    setIsAnalyzeEnabled(allPatternsComplete);
  }, [patterns]);

  // Function to add a new pattern row
  const addPattern = () => {
    if (patterns.length < 7) {
      setPatterns([...patterns, { start: null, end: null }]);
    }
  };

  // Function to remove the last pattern row
  const removePattern = () => {
    if (patterns.length > 3) {
      setPatterns(patterns.slice(0, -1));
    }
  };

  // Add this function to clear a specific pattern
  const clearPattern = (index) => {
    const updatedPatterns = [...patterns];
    updatedPatterns[index] = { start: null, end: null };
    setPatterns(updatedPatterns);
  };

  // Render time scale
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

  // Handle time selection
  const handleTimeSelection = (index, time) => {
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

  // Format time
  const formatTime = (time) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Calculate duration for a single pattern
  const calculateDuration = (start, end) => {
    if (start === null || end === null) return '0h 0m';
    
    let duration;
    if (end >= start) {
      duration = end - start;
    } else {
      duration = 24 - start + end;
    }
    
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    
    return `${hours}h ${minutes}m`;
  };

  // Calculate total sleep time
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

  // Update the renderPatternRow function
  const renderPatternRow = (pattern, index) => {
    const hours = Array.from({ length: 48 }, (_, i) => (i * 0.5 + 18) % 24);
    const duration = calculateDuration(pattern.start, pattern.end);
    return (
      <div key={index} className="pattern-row">
        <div className="pattern-label">Day {index + 1}:</div>
        <div className="pattern-content">
          <div className="time-blocks">
            {hours.map((time) => (
              <div
                key={time}
                className={`time-block ${
                  (pattern.start !== null && pattern.end !== null &&
                    ((pattern.start <= pattern.end && time >= pattern.start && time < pattern.end) ||
                     (pattern.start > pattern.end && (time >= pattern.start || time < pattern.end))))
                    ? 'selected'
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
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleAnalyze = () => {
    // 这里添加分析逻辑
    console.log("Analyzing sleep patterns...");
    // 可以在这里添加更多的分析逻辑或者调用API等
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
            disabled={patterns.length <= 3}
          >
            -
          </button>
          <span className="pattern-count">{patterns.length}</span>
          <button
            onClick={addPattern}
            className="control-button add-button"
            disabled={patterns.length >= 7}
          >
            +
          </button>
        </div>
        <button
          onClick={handleAnalyze}
          className={`analyze-button ${isAnalyzeEnabled ? 'enabled' : 'disabled'}`}
          disabled={!isAnalyzeEnabled}
        >
          Analyze
        </button>
      </div>
    </div>
  );
};

export default SleepPattern;
