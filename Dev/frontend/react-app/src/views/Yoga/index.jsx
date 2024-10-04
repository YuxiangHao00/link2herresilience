import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './yoga.less';
import yogaSymbol from './images/Y_1.png';
import yogaHistory from './images/Y_2.png';
import yogaPractice from './images/Y_3.png';
import yogaRisk from './images/Y_4.png';
import HistoryPage from './history';
import PracticePage from './practice';

export default function YogaPage() {
  const [currentTab, setCurrentTab] = useState('yoga');

  const renderContent = () => {
    switch(currentTab) {
      case 'history':
        return <HistoryPage setCurrentTab={setCurrentTab} />;
      case 'practice':
        return <PracticePage />;
      case 'risks':
        return <div>Risks content</div>;
      default:
        return (
          <>
            <div className="content-wrapper">
              <div className="main-content">
                <h1><span className="highlight">YOGA</span> is the ability to direct the mind exclusively to ward an object and sustain that direction without any distractions.</h1>
                <p>A state of being in the present, not past or future is the true meaning of yoga</p>
                <h2>Overview of its health benefits:</h2>
                <ul>
                  <li>Physical, spiritual & mental well-being</li>
                  <li>Core strength, body pose correction, hip opening, sustaining better spine & neural system.</li>
                  <li>Improving many long term health issues & diseases like type-2 diabetes, asthma, mental health, anxiety etc.</li>
                </ul>
              </div>
              <div className="symbol-wrapper">
                <img src={yogaSymbol} alt="Yoga Symbol" className="yoga-symbol" />
                <p className="sanskrit-text">योगश्चित्तवृत्तिनिरोधः ॥</p>
              </div>
            </div>
            <div className="cards-wrapper">
              <div className="card" onClick={() => setCurrentTab('history')}>
                <img src={yogaHistory} alt="Brief history of yoga & its science" />
                <p>Brief history of yoga & its science</p>
              </div>
              <div className="card" onClick={() => setCurrentTab('practice')}>
                <img src={yogaPractice} alt="Practice of yoga & its types" />
                <p>Practice of yoga & its types</p>
              </div>
              <div className="card" onClick={() => setCurrentTab('risks')}>
                <img src={yogaRisk} alt="Self-assess its associated risk" />
                <p>Self-assess its associated risk</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="yoga-container">
      <div className="tabs">
        <button onClick={() => setCurrentTab('yoga')} className={`tab ${currentTab === 'yoga' ? 'active' : ''}`}>Yoga</button>
        <button onClick={() => setCurrentTab('history')} className={`tab ${currentTab === 'history' ? 'active' : ''}`}>It's history & science</button>
        <button onClick={() => setCurrentTab('practice')} className={`tab ${currentTab === 'practice' ? 'active' : ''}`}>Asanas practice</button>
        <button onClick={() => setCurrentTab('risks')} className={`tab ${currentTab === 'risks' ? 'active' : ''}`}>Assess its risk</button>
      </div>
      
      {renderContent()}
    </div>
  );
}