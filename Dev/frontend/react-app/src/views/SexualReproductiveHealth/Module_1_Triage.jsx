import React from 'react';
import bg from './images/bg40.png'
import '../../style.less'
import './triage.less'
import img10 from './images/10.png'
import img11 from './images/11.png'
import img12 from './images/12.png'
import img13 from './images/13.png'

const Module2Triage = (props) => {
  return (
    <div className="main-page" style={{ backgroundImage: `url(${bg})` }}>
      <div className="page-container">
        <header>
          <h1 className="page-title">Get Started by clicking on any one of the following modules</h1>
        </header>

        <div className='grid-container'>
          <div className="grid-item">
            <img src={img13} alt="Module 3" className="hover-lift" onClick={() => props.actType(3)} />
          </div>
          <div className="grid-item">
            <img src={img11} alt="Module 6" className="hover-lift" onClick={() => props.actType(6)} />
          </div>
          <div className="grid-item">
            <img src={img12} alt="Module 5" className="hover-lift" onClick={() => props.actType(5)} />
          </div>
          <div className="grid-item">
            <img src={img10} alt="Module 4" className="hover-lift" onClick={() => props.actType(12)} />
          </div>
        </div>
        
        <div className="button-container">
          <button 
            onClick={() => props.actType(1)} 
            className='main-btn'
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Module2Triage;