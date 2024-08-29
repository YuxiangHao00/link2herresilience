import React from 'react';
import './LandPage.css';
import backgroundImage from '../../images/LandPageback.svg';
import titleImage from '../../images/SubTital.svg';
import exploreicon from '../../images/ExploreIcon.svg';
import { Link } from 'react-router-dom';

function LandPage() {
  return (
    <div className="land-page" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold text-blue-600">
          Link 2 <span className="text-green-600">HerResilience</span>
        </h1>
        <img src={titleImage} alt="title" className="title-image" />
        <Link to="/health-issues">
          <img src={exploreicon} alt="skip" className="explore-image" />  
        </Link>
      </div>
    </div>
  );
}

export default LandPage;