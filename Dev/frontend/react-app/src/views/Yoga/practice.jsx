import React from 'react';
import './yoga.less';

const yogaAsanas = [
  { name: 'Pranayam', image: 'A_1.png' },
  { name: 'Anantasana', image: 'A_2.png' },
  { name: 'Ardhakati', image: 'A_3.png' },
  { name: 'Chakrasana', image: 'A_4.png' },
  { name: 'Bhujangasana', image: 'A_5.png' },
  { name: 'Kati Chakrasana', image: 'A_6.png' },
  { name: 'Marjariasana', image: 'A_7.png' },
  { name: 'Parvatasana', image: 'A_8.png' },
  { name: 'Sarvangasana', image: 'A_9.png' },
  { name: 'Tadasana', image: 'A_10.png' },
  { name: 'Vajrasana', image: 'A_11.png' },
  { name: 'Viparita Karani', image: 'A_12.png' },
];

export default function PracticePage() {
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
            <div key={index} className={`asana-item row-${Math.floor(index / 3) + 1}`}>
              <div className="asana-image">
                <img src={require(`./images/${asana.image}`)} alt={asana.name} />
              </div>
              <p className="asana-name"><strong>{asana.name}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}