import React, { useRef, useState, useEffect } from 'react';
import './LandPage.css';
import titleImage from '../../images/SubTital.svg';
// import exploreicon from '../../images/ExploreIcon.svg';
import landPageImage from '../../images/LandPage_2_V2.png';
// import descriptionImage from '../../images/HP_description.png';
import hp_l_1 from '../../images/HP_L_1.svg';
import hp_l_2 from '../../images/HP_L_2.svg';
import hp_l_3 from '../../images/HP_L_3.svg';
import hp_l_4 from '../../images/HP_L_4.svg';
import hp_l_5 from '../../images/HP_L_5.svg';
import hp_l_6 from '../../images/HP_L_6.svg';
import f_icon_1 from '../../images/Functional_icon_1.png';
import f_icon_2 from '../../images/Functional_icon_2.png';
import f_icon_3 from '../../images/Functional_icon_3.png';
import f_icon_4 from '../../images/Functional_icon_4.png';
import f_icon_5 from '../../images/Functional_icon_5.png';
import f_icon_6 from '../../images/Functional_icon_6.png';
import jumpPage from '../../images/JumpPage.svg';
import { Link } from 'react-router-dom';
import AboutUs from './AboutUs';
import Privacy from './Privacy';
import Terms from './Terms';
import Team from './Team';

function LandPage() {
  const [currentPage, setCurrentPage] = useState('main');
  const bottomRef = useRef(null);
  const topRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (currentPage === 'main') {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleExploreClick = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  return (
    <div className="land-page">
      <div ref={topRef}></div>
      {currentPage === 'main' && (
        <>
          <div className="logo-container" style={{ marginTop: '-1.5rem' }}>
            <img src="/logo_1.png" alt="Website Logo" className="website-logo" />
          </div>
          
          <h1 style={{ marginTop: '-2.5rem' }}>
            <span className="text-blue-600">Link 2</span>{' '}
            <span className="text-green-600">HerResilience</span>
          </h1>
          
          <div className="image-wrapper">
            <img src={landPageImage} alt="Women in colorful clothes" className="land-page-image" />
            <img src={titleImage} alt="Empowering her for a better tomorrow" className="title-image" />
          </div>
          
          <div className="what-we-do-section">
            <h2 className="what-we-do-title">What we do...</h2>
            <div className="functional-icons-container">
              <div className="functional-icon-wrapper">
                <img src={f_icon_1} alt="Tackle Asthma and other Health issues" className="functional-icon" />
                <p className="icon-description">Tackle Asthma and other Health issues</p>
              </div>
              <div className="functional-icon-wrapper">
                <img src={f_icon_2} alt="Get personalised sleep recommendations" className="functional-icon" />
                <p className="icon-description">Get personalised sleep recommendations</p>
              </div>
              <div className="functional-icon-wrapper">
                <img src={f_icon_3} alt="Acquire classified Sexual education through interactive modules" className="functional-icon" />
                <p className="icon-description">Acquire classified Sexual education through interactive modules</p>
              </div>
              <div className="functional-icon-wrapper">
                <img src={f_icon_4} alt="Learn about common Allergens in Australia" className="functional-icon" />
                <p className="icon-description">Learn about common Allergens in Australia</p>
              </div>
              <div className="functional-icon-wrapper">
                <img src={f_icon_5} alt="Gain personal insights on Yoga" className="functional-icon" />
                <p className="icon-description">Gain personal insights on Yoga</p>
              </div>
              <div className="functional-icon-wrapper">
                <img src={f_icon_6} alt="Learn how to manage Stress and substance abuse prevention" className="functional-icon" />
                <p className="icon-description">Learn how to manage Stress and substance abuse prevention</p>
              </div>
            </div>
          </div>
          
          <div className="hp-wrapper">
            <img src={hp_l_1} alt="HP_L_1" className="hp-image" />
            <div className="hp-text">
              Get insights of different diseases across the country. Our interactive map allows you to see how various health issues are distributed across states and territories, helping you understand the potential risks in your area. 
              <Link to="/health-issues">
                <img src={jumpPage} alt="JumpPage" className="jump-page" />
              </Link>
            </div>
          </div>

          <div className="hp-wrapper">
            <img src={hp_l_2} alt="HP_L_2" className="hp-image" />
            <div className="hp-text">
              Our platform provides the safest regions in Australia for you and your family. Get insights on air quality and medical support for asthma, or identify suburbs with low pollen counts to manage allergies. Make informed decisions for a healthier life.
              <Link to="/suburb-finder">
                <img src={jumpPage} alt="JumpPage" className="jump-page" />
              </Link>
            </div>
          </div>

          <div className="hp-wrapper">
            <img src={hp_l_3} alt="HP_L_3" className="hp-image" />
            <div className="hp-text">
              We understand the unique challenges migrant mothers face when it comes to sleep. Our platform provides personalized insights on sleep quality based on your home's ambient conditions, such as noise levels and temperature. 
              <Link to="/sleep-quality">
                <img src={jumpPage} alt="JumpPage" className="jump-page" />
              </Link>
            </div>
          </div>

          <div className="hp-wrapper">
            <img src={hp_l_4} alt="HP_L_4" className="hp-image" />
            <div className="hp-text">
              Access culturally sensitive sexual education and clear information on STI prevention to make informed decisions about your reproductive health, plan your family, and protect your well-being, regardless of cultural barriers.
              <Link to="/health-issues">
                <img src={jumpPage} alt="JumpPage" className="jump-page" />
              </Link>
            </div>
          </div>

          <div className="hp-wrapper">
            <img src={hp_l_5} alt="HP_L_5" className="hp-image" />
            <div className="hp-text">
              <p>
                Worried about the potential prevalent allergens in Australia? Is this concern making it difficult for you to go out shopping?
              </p>
              <p>
                Well, we have made it less worrying and more easier now with our Allergen checker. Click on the button below to explore more now.
              </p>
              <Link to="/food-allergies">
                <img src={jumpPage} alt="JumpPage" className="jump-page" />
              </Link>
            </div>
          </div>
          <div className="hp-wrapper">
            <img src={hp_l_6} alt="HP_L_6" className="hp-image" />
            <div className="hp-text">
              <p>
                Feeling stressed or struggling with health concerns like asthma or diabetes? 
              </p>
              <p>
                Yoga can help! Whether you're new to yoga or a busy professional, our AI-powered yoga tutorials guide you through poses at your own pace, even helping you correct your form.
              </p>
              <Link to="/yoga">
                <img src={jumpPage} alt="JumpPage" className="jump-page" />
              </Link>
            </div>
          </div>

          <div className="bottom-container">
            <div className="bottom-link" onClick={() => setCurrentPage('about')}>About Us</div>
            <div className="bottom-link" onClick={() => setCurrentPage('privacy')}>Privacy</div>
            <div className="bottom-link" onClick={() => setCurrentPage('terms')}>Terms and Conditions</div>
            <div className="bottom-link" onClick={() => setCurrentPage('team')}>The Team</div>
          </div>
        </>
      )}
      
      <div ref={contentRef}>
        {currentPage === 'about' && <AboutUs onBack={handleBackToMain} />}
        {currentPage === 'privacy' && <Privacy onBack={handleBackToMain} />}
        {currentPage === 'terms' && <Terms onBack={handleBackToMain} />}
        {currentPage === 'team' && <Team onBack={handleBackToMain} />}
      </div>
    </div>
  );
}

export default LandPage;