import React from 'react';
import './LandPage.css';
import titleImage from '../../images/SubTital.svg';
import exploreicon from '../../images/ExploreIcon.svg';
import landPageImage from '../../images/LandPage_2.svg';
import descriptionImage from '../../images/HP_description.svg';
import hp_l_1 from '../../images/HP_L_1.svg';
import hp_l_2 from '../../images/HP_L_2.svg';
import hp_l_3 from '../../images/HP_L_3.svg';
import hp_l_4 from '../../images/HP_L_4.svg';
import jumpPage from '../../images/JumpPage.svg';
import { Link } from 'react-router-dom';

function LandPage() {
  return (
    <div className="land-page">
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
      
      <Link to="/health-issues">
        <img src={exploreicon} alt="Explore More" className="explore-image" />  
      </Link>

      <div className="hp_l_1-wrapper">
        <img src={hp_l_1} alt="HP_L_1" className="hp_l_1" />
        <div className="hp_l_1-text">
          We understand the unique challenges migrant mothers face when it comes to sleep. Our platform provides personalized insights on sleep quality based on your home’s ambient conditions, such as noise levels and temperature.
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
          We understand the unique challenges migrant mothers face when it comes to sleep. Our platform provides personalized insights on sleep quality based on your home’s ambient conditions, such as noise levels and temperature.
          <Link to="/health-issues">
            <img src={jumpPage} alt="JumpPage" className="jump-page_4" />
          </Link>
        </div>
      </div>

    </div>
  );
}

export default LandPage;