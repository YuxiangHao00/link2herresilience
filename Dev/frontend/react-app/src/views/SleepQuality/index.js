import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SQTital from '../../images/SQ/SQ_Tital.svg';
import SQSubTital from '../../images/SQ/SQ_SubTital.svg';
import US2 from '../../images/SQ/SQ_US2.svg';
import US3 from '../../images/SQ/SQ_US3.svg';

function SleepQuality() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    { 
      image: US2, 
      path: '/sleep-quality/self-assess',
      subtitle: 'Sleep Quality estimator',
      description: "It is important to have a good night's sleep which is dependent of factors like one's stress level, sleep duration & heart rate, etc. Find out your past night's sleep quality."
    },
    { 
      image: US3, 
      path: '/sleep-quality/sleep-pattern',
      subtitle: 'Sleeping pattern',
      description: "Analyse your sleeping pattern to be informed about its effect on your health based on the sleep quality"
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-8">
      <img src={SQTital} alt="Better Sleep for a Healthier Life" className="mb-2 w-full max-w-4xl" />
      <img src={SQSubTital} alt="Understand how your environment affects your Sleep Quality" className="mb-6 w-full max-w-4xl" />
      <div className="flex justify-center items-center w-full gap-4 max-w-4xl">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`cursor-pointer transition-all duration-300 flex-1 ${
              hoveredIndex === index ? 'filter-none' : 'brightness-75 contrast-75'
            }`}
            onClick={() => handleNavigate(feature.path)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img 
              src={feature.image} 
              alt={`Feature ${index + 1}`} 
              className="w-full h-auto object-cover rounded-lg"
            />
            <p className="text-center mt-3 font-semibold transition-colors duration-300" 
               style={{ 
                 fontSize: '40px', 
                 fontFamily: 'MyCustomFont', 
                 color: '#16A34A',
               }}
               onMouseEnter={(e) => e.target.style.color = '#15803d'}
               onMouseLeave={(e) => e.target.style.color = '#16A34A'}
            >
              {feature.subtitle}
            </p>
            <p className="text-center mt-2 text-sm text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SleepQuality;