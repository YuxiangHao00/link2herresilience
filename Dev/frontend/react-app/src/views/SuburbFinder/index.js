import React, { useState, useEffect } from 'react';
import { Tabs, Select, Button, Spin } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './index.css';
import Country from './country';
import City1 from './city1';

// 修复 Leaflet 默认图标问题
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// 自定义图标
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
  const [selectedCity, setSelectedCity] = useState('Melbourne');
  const [activeTab, setActiveTab] = useState('1');
  const [tempCity1, setTempCity1] = useState('');
  const [siteData, setSiteData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSiteData();
  }, []);

  const fetchSiteData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('YOUR_API_ENDPOINT'); //API 端点
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

  const citys = siteData.map(site => ({
    name: site.name,
    position: [site.latitude, site.longitude]
  }));

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
              placeholder="City" 
              value={tempCity1} 
              onChange={value => setTempCity1(value)}
            >
              {citys.map((item) => (
                <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
            <Button
              className="bg-[#00BD90] text-white"
              onClick={() => { setShowCity(true); setSelectedCity(tempCity1); }}
              disabled={!tempCity1}
            >
              Switch
            </Button>
            <Button 
              className="bg-[#00BD90] text-white" 
              onClick={() => {setShowCity(false);setTempCity1('')}}
            >
              Return
            </Button>
          </div>
          {showCity ? <City1 city={selectedCity} /> : <Country />}
        </div>
      )}
      
      {activeTab === '2' && (
        <div>
          <div className="map-container">
            {loading ? (
              <Spin size="large" />
            ) : (
              <MapContainer 
                center={[-25.2744, 133.7751]} 
                zoom={4} 
                scrollWheelZoom={false}
                className="leaflet-container"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {siteData.map((site) => (
                  <Marker 
                    key={site.name} 
                    position={[site.latitude, site.longitude]} 
                    icon={customIcon}
                  >
                    <Popup>
                      {site.name}: {site.value}
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