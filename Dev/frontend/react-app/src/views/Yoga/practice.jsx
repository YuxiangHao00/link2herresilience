import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './yoga.less';
import AsanaDetail from './AsanaDetail';
import yogaSequences from '../../data/yogaSequences.json';

const yogaAsanas = [
  { id: 1, name: 'Pranayama', englishName: 'breathing exercise', image: 'A_1.png' },
  { id: 2, name: 'Anantasana', englishName: 'Side reclining leg lift', image: 'A_2.png' },
  { id: 3, name: 'Ardhakati Chakrasana', englishName: 'Standing Side Bend', image: 'A_3.png' },
  { id: 4, name: 'Chakrasana', englishName: 'Upward Bow Pose', image: 'A_4.png' },
  { id: 5, name: 'Bhujangasana', englishName: 'cobra pose', image: 'A_5.png' },
  { id: 6, name: 'Kati Chakrasana', englishName: 'Standing Side Stretch Pose', image: 'A_6.png' },
  { id: 7, name: 'Marjariasana', englishName: 'cat pose', image: 'A_7.png' },
  { id: 8, name: 'Parvatasana', englishName: 'mountain pose', image: 'A_8.png' },
  { id: 9, name: 'Sarvangasana', englishName: 'shoulder stand', image: 'A_9.png' },
  { id: 10, name: 'Tadasana', englishName: 'palm tree stance', image: 'A_10.png' },
  { id: 11, name: 'Vajrasana', englishName: 'diamond pose', image: 'A_11.png' },
  { id: 12, name: 'Viparita Karani', englishName: 'Legs up the Wall Pose', image: 'A_12.png' },
];

export default function PracticePage() {
  const [selectedAsana, setSelectedAsana] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [asanaSequence, setAsanaSequence] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (selectedAsana) {
      const sequence = yogaSequences.yogaSequences.find(seq => seq.id === selectedAsana.id);
      setAsanaSequence(sequence || null);
      setCurrentStep(1);
      setSessionId(uuidv4().slice(0, 8));
    }
  }, [selectedAsana]);

  const handleAsanaClick = (asana) => {
    setSelectedAsana(asana);
  };

  const handleBack = () => {
    setSelectedAsana(null);
    setAsanaSequence(null);
    setSessionId(null);
  };

  const handleRepeat = () => {
    setCurrentStep(1);
  };

  if (selectedAsana && asanaSequence) {
    return (
      <div className="asana-detail-wrapper">
        <h1>{selectedAsana.name} ({selectedAsana.englishName})</h1>
        
        <div className="asana-description">
          <p>{asanaSequence.description}</p>
          <a href={asanaSequence.source} target="_blank" rel="noopener noreferrer">Learn more</a>
        </div>
        
        <div className="step-tabs">
          {Array.from({ length: asanaSequence.stepsCount }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={`step-tab ${currentStep === step ? 'active' : ''}`}
            >
              Step {step}
            </div>
          ))}
        </div>
        <div className="asana-content">
          <AsanaDetail 
            asana={selectedAsana} 
            asanaSequence={asanaSequence} 
            currentStep={currentStep}
            onBack={handleBack}
            onNextStep={() => setCurrentStep(prev => Math.min(prev + 1, asanaSequence.stepsCount))}
            sessionId={sessionId}
            onRepeat={handleRepeat}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="yoga-container practice-page">
      <p className="intro-text">
        A <strong>sick & restless</strong> human <strong>disperses pranas</strong>, whereas <strong>peaceful & healthy</strong> person keeps 
        <strong>pranas within</strong> the body & live a good life!
      </p>
      <h2 className="asanas-title">Types of yoga asanas</h2>
      <div className="asanas-outer-container">
        <div className="asanas-grid">
          {yogaAsanas.map((asana) => (
            <button 
              key={asana.id} 
              className={`asana-item row-${Math.floor((asana.id - 1) / 3) + 1}`}
              onClick={() => handleAsanaClick(asana)}
            >
              <div className="asana-image">
                <img src={require(`./images/${asana.image}`)} alt={asana.name} />
              </div>
              <p className="asana-name">
                <strong>{asana.name}</strong>
                <br />
                <span className="english-name">({asana.englishName})</span>
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}