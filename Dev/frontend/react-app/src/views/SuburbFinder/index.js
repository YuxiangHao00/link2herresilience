import React, { useState, useEffect } from 'react';
import { Tabs, Select, Button, Spin } from 'antd';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from 'd3-scale-chromatic';
import './index.css';
import Country from './country';
import City from './city1';

function getColor(value, min, max) {
    const scale = d3.interpolateRdYlGn((value - min) / (max - min)); // 从红到绿的颜色渐变
    return scale;
}

function Legend({ min, max }) {
    return (
        <div className="legend">
            <h4>Pollen Count</h4>
            <i style={{ background: getColor(max, min, max) }}></i> {`> ${max}`} <br />
            <i style={{ background: getColor((min + max) / 2, min, max) }}></i> {`${(min + max) / 2} - ${max}`} <br />
            <i style={{ background: getColor(min, min, max) }}></i> {`≤ ${min}`} <br />
        </div>
    );
}

function SuburbFinder() {
    const [showCity, setShowCity] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [activeTab, setActiveTab] = useState('1');
    const [siteData, setSiteData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [minPollenCount, setMinPollenCount] = useState(0);
    const [maxPollenCount, setMaxPollenCount] = useState(0);

    const stateOptions = [
        { value: 'New South Wales', cities: ['Sydney'] },
        { value: 'Victoria', cities: ['Melbourne'] },
    ];

    useEffect(() => {
        if (activeTab === '2') {
            fetchPollenData(); // 请求花粉数据
        }
    }, [activeTab]);

    const fetchPollenData = async () => {
        setLoading(true);
        try {
            // mock data
            const fakeData = [
                {
                    "id": 1,
                    "name": "Sydney Central",
                    "latitude": -33.8688,
                    "longitude": 151.2093,
                    "pollenCount": 120
                },
                {
                    "id": 2,
                    "name": "Melbourne CBD",
                    "latitude": -37.8136,
                    "longitude": 144.9631,
                    "pollenCount": 90
                },
                {
                    "id": 3,
                    "name": "Brisbane",
                    "latitude": -27.4698,
                    "longitude": 153.0251,
                    "pollenCount": 70
                },
                {
                    "id": 4,
                    "name": "Perth",
                    "latitude": -31.9505,
                    "longitude": 115.8605,
                    "pollenCount": 150
                },
                {
                    "id": 5,
                    "name": "Adelaide",
                    "latitude": -34.9285,
                    "longitude": 138.6007,
                    "pollenCount": 110
                }
            ];

            const minCount = Math.min(...fakeData.map(d => d.pollenCount));
            const maxCount = Math.max(...fakeData.map(d => d.pollenCount));

            setMinPollenCount(minCount);
            setMaxPollenCount(maxCount);

            // 模拟API调用
            setSiteData(fakeData);
        } catch (error) {
            console.error('Error fetching pollen data:', error);
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
                    {showCity ? <City city={selectedCity} /> : <Country />}
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
                                    <CircleMarker 
                                        key={site.id}
                                        center={[site.latitude, site.longitude]} 
                                        radius={10} // Adjust size as needed
                                        fillColor={getColor(site.pollenCount, minPollenCount, maxPollenCount)} 
                                        color={getColor(site.pollenCount, minPollenCount, maxPollenCount)}
                                        weight={1}
                                        fillOpacity={0.8}
                                    >
                                        <Popup>
                                            {site.name}: {site.pollenCount}
                                        </Popup>
                                    </CircleMarker>
                                ))}
                                <Legend min={minPollenCount} max={maxPollenCount} />
                            </MapContainer>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SuburbFinder;
