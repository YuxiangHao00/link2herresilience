import React from 'react';
import './style.less'
import bg from './images/bg.png'
function SexualReproductiveHealth() {
  return (
    <div className="main-page">
      <header>
        <h1 className="page-title">Empowering Migrant Women for a Healthier Future</h1>

      </header>
      <ul className='info-list'>
        <li className='info-item'>
          <h3 className='subtitle'>Take Charge of Your Health and Well-being</h3>
          <p className='info-details'>As a migrant woman in Australia,
            you deserve access to the knowledge and resources that will he
            lp you make informed decisions about your sexual and reproductive h
            ealth. This platform is designed to guide you with culturally sensitive inf
            ormation that understands your unique needs and experiences.</p>
        </li>
        <li className='info-item' style={{ width: '60%' }}>
          <h3 className='subtitle'>Why is it important?</h3>
          <p className='info-details'>Understanding your reproductive rights and health options allows you to plan your family, prevent STIs, and protect your overall well-being. This space offers tailored resources that will empower you to make choices confidently, free from confusion or judgment.</p>
        </li>
        <li className='info-item' style={{ width: '60%' }}>
          <h3 className='subtitle'>What will you learn?</h3>
          <ul className='description-list'>
            <li>How to access culturally appropriate sexual education in Australia.</li>
            <li>Clear guidance on family planning and reproductive rights.</li>
            <li>Essential information on STI prevention and managing health issues faced by migrant women.</li>
          </ul>
        </li>
      </ul>
      <h3 className='subtitle'>Get Started By Clicking the button below</h3>
      <button className='main-btn' style={{ margin: '58px 0 0 52px' }}>Start Learning</button>
      <img src={bg} style={{height: '80%', width: '40%', position: 'absolute', right: '20px', bottom: '20px' }} />
    </div>
  );
}

export default SexualReproductiveHealth;