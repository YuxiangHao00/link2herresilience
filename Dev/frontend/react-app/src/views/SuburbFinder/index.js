import React, { useState, useEffect } from 'react';
import { Tabs, Select, Button, Spin } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './index.css';
import Country from './country';
import City1 from './city1';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icon
const customIcon = new L.Icon({
  iconUrl: require('../../images/Logo_icon.svg'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-marker-icon'
});

function SuburbFinder() {
  const [showCity, setShowCity] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [siteData, setSiteData] = useState([]);
  const [loading, setLoading] = useState(false);

  const stateOptions = [
    { value: 'New South Wales', cities: ['Sydney'] },
    { value: 'Victoria', cities: ['Melbourne'] },
  ];

  useEffect(() => {
    if (activeTab === '2') {
      fetchSiteData();
    }
  }, [activeTab]);

  const fetchSiteData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/pollen-sites'); // Your API endpoint
      setSiteData(response.data);
    } catch (error) {
      console.error('Error fetching site data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedCity('');
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const handleSwitch = () => {
    if (selectedState && selectedCity) {
      setShowCity(true);
    }
  };

  const handleReturn = () => {
    setShowCity(false);
    setSelectedState('');
    setSelectedCity('');
  };

  return (
    <div className="text-center">
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          { label: 'Air Quality', key: '1' },
          { label: 'Allergic Pollens', key: '2' },
        ]}
        onChange={handleTabChange}
      />
      
      {activeTab === '1' && (
        <div>
          <div className='flex justify-center gap-4 mt-[40px]'>
            <Select 
              className="w-[300px]" 
              placeholder="Select State" 
              value={selectedState} 
              onChange={handleStateChange}
            >
              {stateOptions.map((state) => (
                <Select.Option key={state.value} value={state.value}>
                  {state.value}
                </Select.Option>
              ))}
            </Select>
            <Select 
              className="w-[300px]" 
              placeholder="Select City" 
              value={selectedCity} 
              onChange={handleCityChange}
              disabled={!selectedState}
            >
              {selectedState && stateOptions.find(state => state.value === selectedState).cities.map((city) => (
                <Select.Option key={city} value={city}>
                  {city}
                </Select.Option>
              ))}
            </Select>
            <Button
              className="bg-[#00BD90] text-white"
              onClick={handleSwitch}
              disabled={!selectedState || !selectedCity}
            >
              Switch
            </Button>
            <Button 
              className="bg-[#00BD90] text-white" 
              onClick={handleReturn}
            >
              Return
            </Button>
          </div>
          {showCity ? <City1 city={selectedCity} /> : <Country />}
        </div>
      )}
      
      {activeTab === '2' && (
        <div>
          <div className="map-container h-[600px]">
            {loading ? (
              <Spin size="large" />
            ) : (
              <MapContainer 
                center={[-25.2744, 133.7751]} 
                zoom={4} 
                scrollWheelZoom={true}
                zoomControl={false}
                className="h-full w-full"
              >
                <ZoomControl position="bottomright" />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {siteData.map((site) => (
                  <Marker 
                    key={site.id}
                    position={[site.latitude, site.longitude]} 
                    icon={customIcon}
                  >
                    <Popup>
                      {site.name}: {site.pollenCount}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SuburbFinder;