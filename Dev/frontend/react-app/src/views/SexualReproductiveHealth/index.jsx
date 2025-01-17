import React, { useState, useEffect } from 'react';
import '../../style.less'
import './triage.less'  // 确保导入了 triage.less
import bg from './images/bg.png'
import Triage1 from './Module_1_Triage';
import Triage from './SE_Main_Triage';
import Triage11 from './Module_1_Rights_1';
import Triage12 from './Module_1_Rights_2';
import Triage2 from './Module_1_Planning_1';
import Triage3 from './Module_1_Concent_1';
import Triage31 from './Module_1_Concent_2';
import Triage32 from './Module_1_Concent_3';
import Triage4 from './Module_2_Triage';
import Triage5 from './Module_2_STI_1';
import Triage6 from './Module_2_HI_1';
import Triage8 from './STI_Quiz_1';
import HIQuiz1 from './HI_Quiz_1';

function SexualReproductiveHealth() {
  const [type, setType] = useState(0);

  useEffect(() => {
    window.resetSexualReproductiveHealth = () => {
      setType(0);
    };

    return () => {
      delete window.resetSexualReproductiveHealth;
    };
  }, []);

  const actType = (val) => {
    console.log(val)
    setType(val)
  }
  return (<>
    {type === 0 && (
      <div className="main-page" style={{ 
        backgroundImage: `url(${bg})`, 
        backgroundPosition: 'right bottom', 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: '20% auto',
        minHeight: '100vh'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <header>
            <h1 className="page-title">Empowering Migrant Women for a Healthier Future</h1>
          </header>
          <div className="content-wrapper">
            <div className="info-column">
              <ul className='info-list'>
                <li className='info-item'>
                  <h3 className='subtitle'>Take Charge of Your Health and Well-being</h3>
                  <p className='info-details'>As a migrant woman in Australia,
                    you deserve access to the knowledge and resources that will help you make informed decisions about your sexual and reproductive health. This platform is designed to guide you with culturally sensitive information that understands your unique needs and experiences.</p>
                </li>
                <div className="two-column-layout">
                  <div className="left-column">
                    <li className='info-item'>
                      <h3 className='subtitle'>Why is it important?</h3>
                      <p className='info-details'>Understanding your reproductive rights and health options allows you to plan your family, prevent STIs, and protect your overall well-being. This space offers tailored resources that will empower you to make choices confidently, free from confusion or judgment.</p>
                    </li>
                  </div>
                  <div className="right-column">
                    <li className='info-item'>
                      <h3 className='subtitle'>What will you learn?</h3>
                      <ul className='description-list'>
                        <li>How to access culturally appropriate sexual education in Australia.</li>
                        <li>Clear guidance on family planning and reproductive rights.</li>
                        <li>Essential information on STI prevention and managing health issues faced by migrant women.</li>
                      </ul>
                    </li>
                  </div>
                </div>
              </ul>
              <h3 className='subtitle'>Get Started By Clicking the button below</h3>
              <div className="button-container">
                <button onClick={() => actType(1)} className='main-btn main-btn-small home-btn'>
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    {type === 1 && <Triage actType={(val) => { actType(val) }} />}
    {type === 2 && <Triage1 actType={(val) => { actType(val) }} />}
    {type === 3 && <Triage11 actType={(val) => { actType(val) }} />}
    {type === 4 && <Triage12 actType={(val) => { actType(val) }} />}
    {type === 5 && <Triage2 actType={(val) => { actType(val) }} />}
    {type === 6 && <Triage3 actType={(val) => { actType(val) }} />}
    {type === 7 && <Triage31 actType={(val) => { actType(val) }} />}
    {type === 8 && <Triage32 actType={(val) => { actType(val) }} />}
    {type === 9 && <Triage4 actType={(val) => { actType(val) }} />}
    {type === 10 && <Triage5 actType={(val) => { actType(val) }} />}
    {type === 11 && <Triage6 actType={(val) => { actType(val) }} />}
    {type === 12 && <HIQuiz1 actType={(val) => { actType(val) }} />}
    {type === 13 && <Triage8 actType={(val) => { actType(val) }} />}
  </>
  );
}

export default SexualReproductiveHealth;