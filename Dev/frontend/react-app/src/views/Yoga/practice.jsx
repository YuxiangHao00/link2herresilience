import React, { useState } from 'react';
import './yoga.less';
import AsanaDetail from './AsanaDetail';

const yogaAsanas = [
  { name: 'Pranayam', englishName: 'breathing exercise', image: 'A_1.png' },
  { name: 'Anantasana', englishName: 'Side reclining leg lift', image: 'A_2.png' },
  { name: 'Ardhakati', englishName: 'Standing Side Bend', image: 'A_3.png' },
  { name: 'Chakrasana', englishName: 'Upward Bow Pose', image: 'A_4.png' },
  { name: 'Bhujangasana', englishName: 'cobra pose', image: 'A_5.png' },
  { name: 'Kati Chakrasana', englishName: 'Standing Side Stretch Pose', image: 'A_6.png' },
  { name: 'Marjariasana', englishName: 'cat pose', image: 'A_7.png' },
  { name: 'Parvatasana', englishName: 'mountain pose', image: 'A_8.png' },
  { name: 'Sarvangasana', englishName: 'shoulder stand', image: 'A_9.png' },
  { name: 'Tadasana', englishName: 'palm tree stance', image: 'A_10.png' },
  { name: 'Vajrasana', englishName: 'diamond pose', image: 'A_11.png' },
  { name: 'Viparita Karani', englishName: 'Legs up the Wall Pose', image: 'A_12.png' },
];

export default function PracticePage() {
  const [selectedAsana, setSelectedAsana] = useState(null);

  const handleAsanaClick = (asana) => {
    setSelectedAsana(asana);
  };

  if (selectedAsana) {
    return <AsanaDetail asana={selectedAsana} onBack={() => setSelectedAsana(null)} />;
  }

  return (
    <div className="yoga-container practice-page">
      <p className="intro-text">
        A <strong>sick & restless</strong> human <strong>disperses pranas</strong>, whereas <strong>peaceful & healthy</strong> person keeps 
        <strong>pranas within</strong> the body & live a good life!
      </p>
      <h2 className="asanas-title">Types of yoga asanas</h2>
      <div className="asanas-outer-container">
        <div className="asanas-grid">
          {yogaAsanas.map((asana, index) => (
            <button 
              key={index} 
              className={`asana-item row-${Math.floor(index / 3) + 1}`}
              onClick={() => handleAsanaClick(asana)}
            >
              <div className="asana-image">
                <img src={require(`./images/${asana.image}`)} alt={asana.name} />
              </div>
              <p className="asana-name">
                <strong>{asana.name}</strong>
                <br />
                <span className="english-name">({asana.englishName})</span>
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}