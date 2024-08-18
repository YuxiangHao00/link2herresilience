import React from 'react';
import './App.css';
import LogoIcon from './images/Logo_icon.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="nav-container">
          <div className="logo-title">
            <img src={LogoIcon} alt="Harmony Link Logo" className="logo" />
            <div className="title-subtitle">
                <h1>
                    <span className="harmony">Harmony</span> <span className="link">Link</span>
                </h1>
              <p className="subtitle">Helping immigrant women to integrate into their new environment</p>
            </div>
          </div>
          <div className="language-select">
            <select>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>
      </header>
      <main>
        <div className="flower-container">
          <img src={require('./images/Vector 1.svg').default} alt="Flower" className="flower" />
        </div>
        <div className="center-element">
          <input type="text" placeholder="Search..." />
        </div>
      </main>
    </div>
  );
}

export default App;
