import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs } from 'antd';
import AllergenRecognition from './recognition';
import './Food.less';

const { TabPane } = Tabs;

const allergens = [
  { id: 1, name: 'Egg', description: 'Egg allergies can cause various symptoms...' },
  { id: 2, name: 'Milk (Dairy)', description: 'Dairy allergies are caused by an immune system reaction...' },
  { id: 3, name: 'Peanut', description: 'Peanut allergies are one of the most common food allergies...' },
  { id: 4, name: 'Tree nut', description: 'Tree nut allergies can be severe and often last a lifetime...' },
  { id: 5, name: 'Fish', description: 'Fish allergies can develop at any age...' },
  { id: 6, name: 'Crustacean & mollusc', description: 'Shellfish allergies can cause severe reactions...' },
  { id: 7, name: 'Soy', description: 'Soy allergies are common in children...' },
  { id: 8, name: 'Wheat', description: 'Wheat allergies can be confused with celiac disease...' },
  { id: 9, name: 'Sesame', description: 'Sesame allergies are becoming increasingly common...' },
];

export default function FoodAllergies() {
  const [selectedAllergen, setSelectedAllergen] = useState(null);
  const [allergenImages, setAllergenImages] = useState({});
  const [activeTab, setActiveTab] = useState('allergies');

  useEffect(() => {
    const importAll = (r) => {
      let images = {};
      r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
      return images;
    }
    
    const images = importAll(require.context('./images', false, /F_\d+\.png$/));
    setAllergenImages(images);
  }, []);

  const openModal = (allergen) => {
    setSelectedAllergen(allergen);
  };

  const closeModal = () => {
    setSelectedAllergen(null);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="food-allergies-container">
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Common Food Allergies" key="allergies">
          <h1 className="title">Common Food Allergies</h1>
          <div className="allergen-grid">
            {allergens.map((allergen) => (
              <div key={allergen.id} className="allergen-item" onClick={() => openModal(allergen)}>
                <img src={allergenImages[`F_${allergen.id}.png`]} alt={allergen.name} />
                <p>{allergen.name}</p>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="Allergen Recognition" key="recognition">
          <AllergenRecognition />
        </TabPane>
      </Tabs>
      {selectedAllergen && (
        <Modal open={!!selectedAllergen} onCancel={closeModal} footer={null}>
          <div className="modal-content">
            <h2>{selectedAllergen.name}</h2>
            <p>{selectedAllergen.description}</p>
            <Button onClick={closeModal}>Close</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}