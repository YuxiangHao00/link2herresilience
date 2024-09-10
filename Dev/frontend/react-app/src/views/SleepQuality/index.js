import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SQTital from '../../images/SQ/SQ_Tital.svg';
import SQSubTital from '../../images/SQ/SQ_SubTital.svg';
import US1 from '../../images/SQ/SQ_US1.svg';
import US2 from '../../images/SQ/SQ_US2.svg';
import US3 from '../../images/SQ/SQ_US3.svg';

function SleepQuality() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    { image: US1, path: '/sleep-quality/noise-detection' },
    { image: US2, path: '/sleep-quality/feature2' },
    { image: US3, path: '/sleep-quality/sleep-pattern' }, // 更改这里的路径
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-8">
      <img src={SQTital} alt="Better Sleep for a Healthier Life" className="mb-2 w-full max-w-4xl" />
      <img src={SQSubTital} alt="Understand how your environment affects your Sleep Quality" className="mb-6 w-full max-w-4xl" />
      <div className="flex justify-center items-center w-full gap-4">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default SleepQuality;