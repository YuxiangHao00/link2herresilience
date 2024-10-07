import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Row, Col } from 'antd';
import AllergenRecognition from './recognition';
import './Food.less';

const { TabPane } = Tabs;

const allergens = [
  { 
    id: 1, 
    name: 'Egg', 
    description: `Egg allergy is one of the most common food allergies, especially in children. It occurs when the immune system overreacts to proteins found in egg whites or yolks.

Common Foods: Eggs can be found in baked goods, pasta, mayonnaise, meringues, sauces, and even in some vaccines.
Allergic Reaction: Symptoms can include skin reactions (such as hives or swelling), respiratory problems, and in severe cases, anaphylaxis.
Labeling Tip: Look for terms like "albumin," "ovomucoid," or "lysozyme" which indicate the presence of egg proteins.
Substitute: For baking, common egg substitutes include applesauce, mashed bananas, or commercial egg replacement powders.`,
    links: [
      {
        text: 'Follow the link for the Dietary Guide for Egg Allergy.',
        url: 'https://www.allergy.org.au/patients/food-allergy/ascia-dietary-avoidance-for-food-allergy/egg#:~:text=Avoiding%20whole%20egg%2C%20raw%20egg,thickener%20in%20many%20prepared%20foods.'
      },
      {
        text: 'For more information click on the link.',
        url: 'https://www.healthdirect.gov.au/egg-allergy'
      }
    ]
  },
  { 
    id: 2, 
    name: 'Milk (Dairy)', 
    description: `A milk or dairy allergy occurs when the immune system reacts to proteins found in cow's milk. It is one of the most common food allergies in children, though it can affect adults as well.

Common Foods: Milk is present in dairy products such as butter, cheese, cream, yogurt, and baked goods.
Allergic Reaction: Symptoms may include gastrointestinal distress (diarrhea, vomiting), skin issues (rashes, eczema), and respiratory problems.
Labeling Tip: Watch for hidden sources in non-dairy items, such as processed meats or flavorings. Terms like "casein," "whey," or "lactalbumin" indicate milk proteins.
Substitute: Use plant-based milk alternatives like almond, soy, or oat milk in cooking and baking.`,
    links: [
      {
        text: 'Follow the link for the Dietary Guide for Milk Allergy.',
        url: 'https://www.allergy.org.au/patients/food-allergy/ascia-dietary-avoidance-for-food-allergy/cows-milk-dairy'
      },
      {
        text: 'For more information click on the link.',
        url: 'https://www.healthdirect.gov.au/allergic-reactions-to-cows-milk'
      }
    ]
  },
  { 
    id: 3, 
    name: 'Peanut', 
    description: `Peanut allergy is one of the most common food allergies and can occur even with trace amounts of peanuts. It often starts in childhood but can persist into adulthood. Managing this allergy involves strict avoidance of peanuts in all forms, including hidden ingredients in processed foods.

Common Foods: Peanuts are found in many processed foods such as peanut butter, snacks, sauces, and desserts.
Allergic Reaction: Peanut allergies are one of the most severe, with reactions ranging from mild hives to life-threatening anaphylaxis.
Labeling Tip: Always check for warnings like "may contain peanuts" or "produced in a facility that processes peanuts," as cross-contamination can be a risk.
Substitute: Sunflower seed butter or soy nut butter can serve as alternatives to peanut butter.`,
    links: [
      {
        text: 'Follow the link for the Dietary Guide for Peanut Allergy.',
        url: 'https://www.allergy.org.au/patients/food-allergy/ascia-dietary-avoidance-for-food-allergy/peanut'
      }
    ]
  },
  { 
    id: 4, 
    name: 'Tree nut', 
    description: `Tree nut allergy is a common food allergy, especially in children, involving nuts like almonds, walnuts, hazelnuts, and cashews. Tree nuts are often found in processed foods, and even trace amounts can trigger reactions. Avoiding tree nuts is crucial, as cross-contamination is common in kitchens and food products.

Common Foods: Tree nuts include almonds, walnuts, hazelnuts, cashews, pistachios, and Brazil nuts. These can be found in granola, pastries, and nut-based oils.
Allergic Reaction: Reactions can range from mild (itching and swelling) to severe anaphylaxis.
Labeling Tip: Even foods like salad dressings or certain oils can contain tree nuts, so check for labels indicating nuts or nut derivatives.
Substitute: Seeds, such as pumpkin or sunflower seeds, can be used as alternatives in cooking.`,
    links: [
      {
        text: 'Follow the link for the Dietary Guide for Tree nut Allergy.',
        url: 'https://www.allergy.org.au/patients/food-allergy/ascia-dietary-avoidance-for-food-allergy/treenut'
      },
      {
        text: 'For more information on Nut Allergies, click on the link.',
        url: 'https://www.healthdirect.gov.au/nut-allergies'
      }
    ]
  },
  { 
    id: 5, 
    name: 'Fish', 
    description: `A fish allergy occurs when the immune system reacts to proteins found in fish, such as cod, salmon, or tuna. It can be triggered by consuming fish or inhaling cooking vapors. Managing a fish allergy involves avoiding fish products and ensuring cross-contamination does not occur in kitchens or food products.

Common Foods: Fish can be found in seafood dishes, sauces (like Worcestershire), and even some food additives.
Allergic Reaction: Fish allergies often cause skin reactions, respiratory distress, or gastrointestinal symptoms. Cross-reactivity with shellfish can occur.
Labeling Tip: Be cautious of food labels that include "anchovy," "fish oil," or "surimi" as ingredients.
Substitute: Tofu or plant-based fish alternatives are often used in cooking.`,
    links: [
      {
        text: 'Follow the link for the Dietary Guide for Fish Allergy.',
        url: 'https://www.allergy.org.au/patients/food-allergy/ascia-dietary-avoidance-for-food-allergy/fish'
      },
      {
        text: 'For more information on Fish Allergies, click on the link.',
        url: 'https://www.healthdirect.gov.au/allergies-to-seafood'
      }
    ]
  },
  { 
    id: 6, 
    name: 'Crustacean & mollusc', 
    description: `A crustacean and mollusc allergy, commonly referred to as the Shell Fish Allergy, involves a reaction to shellfish such as shrimp, crab, lobster, oysters, and clams. It is one of the most common food allergies worldwide, and affected individuals must be cautious with seafood dishes. Cross-contact during food preparation can also pose a risk for those with this allergy.

Common Foods: Includes shrimp, lobster, crab (crustaceans), and oysters, clams, and squid (mollusks). These are common in seafood dishes.
Allergic Reaction: Shellfish allergies are typically severe and can cause rapid anaphylaxis. Cross-contamination is common in seafood processing.
Labeling Tip: Watch for terms like "seafood flavoring" or "crustacea" on labels.
Substitute: Mushrooms or jackfruit are often used as texture substitutes for shellfish in plant-based recipes.`,
    links: [
      {
        text: 'Follow the link for the Dietary Guide for Shell Fish Allergy.',
        url: 'https://www.allergy.org.au/patients/food-allergy/ascia-dietary-avoidance-for-food-allergy/shellfish'
      },
      {
        text: 'For more information click on the link.',
        url: 'https://allergyfacts.org.au/allergy-anaphylaxis/food-allergens/mollusc'
      }
    ]
  },
  { 
    id: 7, 
    name: 'Soy', 
    description: `Soy allergy occurs when the body's immune system reacts to proteins in soybeans, which are commonly found in processed foods, soy products, and certain beverages. Soy is widely used as an ingredient in many food items, making it essential for those with soy allergies to carefully check food labels to avoid exposure.

Common Foods: Soy is commonly found in processed foods, soy milk, tofu, soy sauce, and meat substitutes.
Allergic Reaction: Soy allergies may cause gastrointestinal symptoms, skin reactions, and breathing difficulties.
Labeling Tip: Look for terms like "soy protein," "soy lecithin," or "hydrolyzed vegetable protein" on food labels.
Substitute: For soy-free cooking, use coconut aminos in place of soy sauce and almond milk or oat milk as a dairy alternative.`,
    links: [
      {
        text: 'Follow the link for the Dietary Guide for Soy Allergy.',
        url: 'https://www.allergy.org.au/patients/food-allergy/ascia-dietary-avoidance-for-food-allergy/soy'
      },
      {
        text: 'For more information click on the link.',
        url: 'https://allergyfacts.org.au/allergy-anaphylaxis/food-allergens/soy'
      }
    ]
  },
  { 
    id: 8, 
    name: 'Wheat', 
    description: `Wheat allergy is an immune reaction triggered by consuming wheat proteins, commonly found in food like bread and pasta. It's important for individuals with wheat allergies to carefully check food labels and opt for wheat-free alternatives such as gluten-free products or non-wheat flours like almond or rice flour.

Common Foods: Wheat is a common ingredient in bread, pasta, baked goods, and cereals.
Allergic Reaction: Symptoms include digestive issues, skin reactions, and respiratory problems. Be aware that wheat allergy is different from celiac disease (gluten intolerance).
Labeling Tip: Watch for terms like "gluten," "wheat starch," or "durum" in ingredient lists.
Substitute: Use gluten-free flours like almond flour, coconut flour, or rice flour in recipes.`,
    links: [
      {
        text: 'Follow the link for the Dietary Guide for Wheat Allergy.',
        url: 'https://www.allergy.org.au/patients/food-allergy/ascia-dietary-avoidance-for-food-allergy/wheat'
      },
      {
        text: 'For more information click on the link.',
        url: 'https://allergyfacts.org.au/allergy-anaphylaxis/food-allergens/wheat'
      }
    ]
  },
  { 
    id: 9, 
    name: 'Sesame', 
    description: `Sesame allergy is increasingly common, especially in countries like Australia where sesame is used in many foods, such as breads and sauces. Even small amounts can trigger reactions. Sesame is often hidden in ingredients like oils and flavorings, so careful label reading is crucial for allergy management in food products.

Common Foods: Sesame seeds are found in tahini, hummus, breads, and various Middle Eastern and Asian dishes.
Allergic Reaction: Sesame allergies can cause mild to severe symptoms, including anaphylaxis.
Labeling Tip: Check for "sesamol" or "sesame oil" on ingredient lists. Sesame seeds may also be used as a garnish in many pre-packaged foods.
Substitute: Use sunflower seeds or tahini-free recipes as alternatives to sesame in cooking.`,
    links: [
      {
        text: 'Follow the link for the Dietary Guide for Sesame Allergy.',
        url: 'https://www.allergy.org.au/patients/food-allergy/ascia-dietary-avoidance-for-food-allergy/sesame'
      },
      {
        text: 'For more information click on the link.',
        url: 'https://allergyfacts.org.au/allergy-anaphylaxis/food-allergens/sesame'
      }
    ]
  },
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
          <h1 className="title">Click to View Allergic Reactions</h1>
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
        <Modal 
          open={!!selectedAllergen} 
          onCancel={closeModal} 
          footer={null}
          width={800}
          className="allergen-modal"
        >
          <div className="modal-content">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <img 
                  src={allergenImages[`F_${selectedAllergen.id}.png`]} 
                  alt={selectedAllergen.name} 
                  className="allergen-image"
                />
              </Col>
              <Col xs={24} md={16}>
                <h2>{selectedAllergen.name}</h2>
                <p>{selectedAllergen.description}</p>
                {selectedAllergen.links && (
                  <div className="allergen-links">
                    {selectedAllergen.links.map((link, index) => (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.text}
                      </a>
                    ))}
                  </div>
                )}
                <Button onClick={closeModal}>Close</Button>
              </Col>
            </Row>
          </div>
        </Modal>
      )}
    </div>
  );
}