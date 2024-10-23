import React, { useState } from 'react';
import yogaText from './images/Y_5.png';
import yogaSeal from './images/Y_6.png';
import yogaStats from './images/Y_7.png';
import yogaPractitioners from './images/Y_8.png';

export default function HistoryPage({ setCurrentTab }) {
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleImageClick = (image) => {
    setEnlargedImage(image);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="yoga-container history-page">
      <div className="history-content">
        <img src={yogaText} alt="Ancient yoga text" className="yoga-text" />
        <div className="history-main">
          <div className="text-content">
            <p>In the right is the stone seal of <strong>Pashupati</strong> from 2500 BC from Indus valley civilisation depicting the trident god, lord <strong>Shiva</strong> who is the Mahayogi & the creator of yoga practice.</p>
            <p>The modern yoga practice originated in the early 20th century, from the disciplines & followers of classical yoga: <strong>yoga sutras & asanas</strong>, formulated by an Indian yogi & mystic, <strong>Patanjali</strong> (father of classical yoga in the ancient era). Since then, there has been many yoga practitioners around the world, with slight changes & branches as per the culture & teachers. Among them, Krishnamacharya pen down age-old poses & counterposes, discussing all the elements of yoga by placing highest value on Patanjali's yoga sutra.</p>
          </div>
          <img src={yogaSeal} alt="Pashupati Seal" className="yoga-seal" />
        </div>
      </div>
      
      <div className="science-section">
        <div className="science-container">
          <div className="stats-images">
            <div className="image-wrapper">
              <img 
                src={yogaStats} 
                alt="Yoga Statistics" 
                className="yoga-stats" 
                onClick={() => handleImageClick(yogaStats)}
              />
              <div className="zoom-hint">Click to enlarge</div>
            </div>
            <div className="image-wrapper">
              <img 
                src={yogaPractitioners} 
                alt="Yoga Practitioners" 
                className="yoga-practitioners" 
                onClick={() => handleImageClick(yogaPractitioners)}
              />
              <div className="zoom-hint">Click to enlarge</div>
            </div>
          </div>
          <div className="science-content">
            <h2>Science of yoga & insights</h2>
            <p>Yoga is treated as a form of exercise, decoupled from meditation & practice with focus towards physiology, anatomy & psychology.</p>
            <div className="effects">
              <p><span className="effect-title">Physical effects:</span> bones strength & joints mobility, improves posture;</p>
              <p>involves isometric activity which builds muscular strength;</p>
              <p>considered safer than many sports;</p>
              <p>slows heart rate, reduces blood pressure</p>
              <p><span className="effect-title">Physiological effects:</span> maintain physical fitness,</p>
              <p>asanas practice led to moderate workout;</p>
              <p>relax autonomic nervous system</p>
              <p><span className="effect-title">Psychological effects:</span> reduce stress & depression effects</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="learn-more">
        <button className="learn-more-link" onClick={() => setCurrentTab('practice')}>
          Learn more about practice of yoga asanas
        </button>
      </div>
      
      <div className="sanskrit-footer">
        <p>स्थिरसुखमासनम् ॥</p>
      </div>
      
      {enlargedImage && (
        <div className="enlarged-image-overlay" onClick={closeEnlargedImage}>
          <div className="enlarged-image-container">
            <img src={enlargedImage} alt="Enlarged view" className="enlarged-image" />
          </div>
        </div>
      )}
    </div>
  );
}
