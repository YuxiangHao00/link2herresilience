import React, { useState, useEffect } from 'react';
import { Tabs, Select, Button, Spin } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './index.css';
import Country from './country';
import City from './city1';

const { Option } = Select;

// 自定义 Tooltip 组件
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{`Week: ${label}`}</p>
        {payload.map((pld) => (
          <p key={pld.dataKey} style={{ color: pld.color }}>
            {`${pld.dataKey}: ${pld.value.toFixed(1)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// PollenChart 组件
const PollenChart = ({ data }) => {
  const processedData = Array.from({ length: 53 }, (_, i) => ({
    week: i,
    '2009': 0,
    '2010': 0,
    '2011': 0
  }));

  data.forEach(item => {
    const weekIndex = parseInt(item.week_number);
    if (weekIndex >= 0 && weekIndex <= 52) {
      processedData[weekIndex][item.year] = item.count || 0;
    }
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={processedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} horizontal={true} stroke="#e0e0e0" />
        <XAxis dataKey="week" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="2009" stroke="#8884d8" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="2010" stroke="#82ca9d" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="2011" stroke="#ffc658" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// SuburbFinder 主组件
function SuburbFinder() {
    const [showCity, setShowCity] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [activeTab, setActiveTab] = useState('1');
    const [pollenData, setPollenData] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedPollen, setSelectedPollen] = useState('');
    const [chartData, setChartData] = useState([]);
    const [mapView, setMapView] = useState({
        center: [-25.2744, 133.7751],
        zoom: 4
    });

    useEffect(() => {
        if (activeTab === '2') {
            fetchPollenData();
            setMapView({
                center: [-25.2744, 133.7751],
                zoom: 4
            });
        }
    }, [activeTab]);

    const fetchPollenData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:5002/allergic_pollen/v1/pollens');
            setPollenData(response.data);
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
        setSelectedPollen('');
    };

    const handlePollenChange = (value) => {
        setSelectedPollen(value);
    };

    const handleSearch = async () => {
        if (selectedState && selectedPollen) {
            try {
                const response = await axios.get(`http://127.0.0.1:5002/allergic_pollen/v1/stateCount?state=${selectedState}&pollen=${selectedPollen}`);
                setChartData(response.data.pollens_count);
                
                const stateData = pollenData[selectedState];
                if (stateData && stateData.coordinates) {
                    setMapView({
                        center: [stateData.coordinates[1], stateData.coordinates[0]],
                        zoom: 8
                    });
                }
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        }
    };

    const customIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

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
                            onChange={(value) => setSelectedState(value)}
                        >
                            <Option value="New South Wales">New South Wales</Option>
                            <Option value="Victoria">Victoria</Option>
                        </Select>
                        <Select 
                            className="w-[300px]" 
                            placeholder="Select City" 
                            value={selectedCity} 
                            onChange={(value) => setSelectedCity(value)}
                            disabled={!selectedState}
                        >
                            {selectedState === 'New South Wales' && <Option value="Sydney">Sydney</Option>}
                            {selectedState === 'Victoria' && <Option value="Melbourne">Melbourne</Option>}
                        </Select>
                        <Button
                            className="bg-[#00BD90] text-white"
                            onClick={() => setShowCity(true)}
                            disabled={!selectedState || !selectedCity}
                        >
                            Switch
                        </Button>
                        <Button 
                            className="bg-[#00BD90] text-white" 
                            onClick={() => {
                                setShowCity(false);
                                setSelectedState('');
                                setSelectedCity('');
                            }}
                        >
                            Return
                        </Button>
                    </div>
                    {showCity ? <City city={selectedCity} /> : <Country />}
                </div>
            )}
            
            {activeTab === '2' && (
                <div>
                    <div className="flex justify-center gap-4 mt-[40px]">
                        <Select 
                            style={{ width: 200 }}
                            placeholder="Select State"
                            onChange={handleStateChange}
                            value={selectedState}
                        >
                            {Object.keys(pollenData).map(state => (
                                <Option key={state} value={state}>{state.toUpperCase()}</Option>
                            ))}
                        </Select>
                        <Select
                            style={{ width: 200 }}
                            placeholder="Select Pollen"
                            onChange={handlePollenChange}
                            value={selectedPollen}
                            disabled={!selectedState}
                        >
                            {selectedState && pollenData[selectedState]?.pollen_grains.map(pollen => (
                                <Option key={pollen} value={pollen}>{pollen}</Option>
                            ))}
                        </Select>
                        <Button onClick={handleSearch} disabled={!selectedState || !selectedPollen}>
                            Search
                        </Button>
                    </div>
                    <div className="map-container h-[400px] mt-[20px]">
                        {loading ? (
                            <Spin size="large" />
                        ) : (
                            <MapContainer 
                                key={`${mapView.center[0]}-${mapView.center[1]}-${mapView.zoom}`}
                                center={mapView.center}
                                zoom={mapView.zoom}
                                scrollWheelZoom={true}
                                zoomControl={false}
                                className="h-full w-full"
                            >
                                <ZoomControl position="bottomright" />
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {Object.entries(pollenData).map(([state, data]) => (
                                    <Marker 
                                        key={state}
                                        position={[data.coordinates[1], data.coordinates[0]]}
                                        icon={customIcon}
                                    >
                                        <Popup>
                                            {data.location_name}
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        )}
                    </div>
                    {chartData.length > 0 && (
                        <div className="chart-container mt-[20px]">
                            <PollenChart data={chartData} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SuburbFinder;