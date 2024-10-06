import React, { useRef, useState, useEffect } from 'react';
import './LandPage.css';
import titleImage from '../../images/SubTital.svg';
import exploreicon from '../../images/ExploreIcon.svg';
import landPageImage from '../../images/LandPage_2.svg';
import descriptionImage from '../../images/HP_description.png';
import hp_l_1 from '../../images/HP_L_1.svg';
import hp_l_2 from '../../images/HP_L_2.svg';
import hp_l_3 from '../../images/HP_L_3.svg';
import hp_l_4 from '../../images/HP_L_4.svg';
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
          <div className="logo-container">
            <img src="/logo_1.png" alt="Website Logo" className="website-logo" />
          </div>
          
          <h1>
            <span className="text-blue-600">Link 2</span>{' '}
            <span className="text-green-600">HerResilience</span>
          </h1>
          
          <div className="image-wrapper">
            <img src={landPageImage} alt="Women in colorful clothes" className="land-page-image" />
          </div>
          
          <div className="image-wrapper">
            <img src={titleImage} alt="Empowering her for a better tomorrow" className="title-image" />
          </div>
          
          <div className="image-wrapper">
            <img src={descriptionImage} alt="What makes us better" className="description-image" />
          </div>
          
          <img 
            src={exploreicon} 
            alt="Explore More" 
            className="explore-image" 
            onClick={handleExploreClick}
            style={{ cursor: 'pointer' }}
          />
          <div ref={bottomRef}></div>
          <div className="hp_l_1-wrapper">
            <img src={hp_l_1} alt="HP_L_1" className="hp_l_1" />
            <div className="hp_l_1-text">
              Get insights of different diseases across the country. Our interactive map allows you to see how various health issues are distributed across states and territories, helping you understand the potential risks in your area. 
              <Link to="/health-issues">
                <img src={jumpPage} alt="JumpPage" className="jump-page" />
              </Link>
            </div>
          </div>

          <div className="hp_l_2-wrapper">
            <img src={hp_l_2} alt="HP_L_2" className="hp_l_2" />
            <div className="hp_l_2-text">
              Our platform provides the safest regions in Australia for you and your family. Get insights on air quality and medical support for asthma, or identify suburbs with low pollen counts to manage allergies. Make informed decisions for a healthier life.
              <Link to="/suburb-finder">
                <img src={jumpPage} alt="JumpPage" className="jump-page_2" />
              </Link>
            </div>
          </div>

          <div className="hp_l_3-wrapper">
            <img src={hp_l_3} alt="HP_L_3" className="hp_l_3" />
            <div className="hp_l_3-text">
              We understand the unique challenges migrant mothers face when it comes to sleep. Our platform provides personalized insights on sleep quality based on your home’s ambient conditions, such as noise levels and temperature. 
              <Link to="/sleep-quality">
                <img src={jumpPage} alt="JumpPage" className="jump-page_3" />
              </Link>
            </div>
          </div>

          <div className="hp_l_4-wrapper">
            <img src={hp_l_4} alt="HP_L_4" className="hp_l_4" />
            <div className="hp_l_4-text">
              Access culturally sensitive sexual education and clear information on STI prevention to make informed decisions about your reproductive health, plan your family, and protect your well-being, regardless of cultural barriers.
              <Link to="/health-issues">
                <img src={jumpPage} alt="JumpPage" className="jump-page_4" />
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