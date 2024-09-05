import React, { useState, useEffect } from 'react';
import { Select, Button, Dropdown, Space, message, Tabs } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import longTermConditionData from '../../data/long-term_condition.json';
import './index.css';

export default function DiseasePrevalenceComponent() {
  const [activeTab, setActiveTab] = useState('1');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    console.log('Component mounted, fetching data...');
    fetchJSONData();
  }, []);

  const fetchJSONData = () => {
    setLoading(true);
    setError(null);
    setIsDataReady(false);
    
    try {
      console.log('Initial data length:', longTermConditionData.length);

      const australianRegions = [
        'New South Wales', 'Victoria', 'Queensland', 'South Australia',
        'Western Australia', 'Tasmania', 'Northern Territory', 'Australian Capital Territory'
      ];

      let filteredData = longTermConditionData.filter(item => 
        item.health_condition_name && 
        item.Count !== undefined &&
        !isNaN(item.Count)
      );

      console.log('Data after initial filtering:', filteredData.length);

      if (activeTab === '1') { // Country tab
        if (selectedGender || selectedAgeGroup) {
          filteredData = filteredData.filter(item => 
            item.region_name === null &&
            (!selectedGender || item.gender === selectedGender) &&
            (!selectedAgeGroup || item.age_group === selectedAgeGroup)
          );
        } else {
          // If no gender or age group is selected, use the country-level data
          filteredData = filteredData.filter(item => 
            item.gender === null && 
            item.age_group === null && 
            item.birth_region_name === "Australia"
          );
        }
      } else if (activeTab === '2') { // State tab
        if (selectedRegion) {
          filteredData = filteredData.filter(item => 
            item.region_name === selectedRegion &&
            item.gender === null &&
            item.age_group === null
          );
        } else {
          // If no region is selected, show all regions
          filteredData = filteredData.filter(item => 
            australianRegions.includes(item.region_name) &&
            item.gender === null &&
            item.age_group === null
          );
        }
      }

      console.log('Filtered data:', filteredData);

      if (filteredData.length === 0) {
        setError('No data available for the selected criteria');
        setLoading(false);
        return;
      }

      const processedData = filteredData.map(item => ({
        name: item.health_condition_name,
        count: item.Count
      }));

      console.log('Processed data:', processedData);
      setData(processedData);
      setIsDataReady(true);
    } catch (error) {
      console.error('Data processing error:', error);
      setError('Data processing error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (e) => {
    const sortOrder = e.key === '1' ? 'desc' : 'asc';
    message.info(`Sorting by ${sortOrder === 'desc' ? 'high to low' : 'low to high'}.`);
    
    const sortedData = [...data].sort((a, b) => {
      return sortOrder === 'desc' 
        ? b.count - a.count
        : a.count - b.count;
    });

    setData(sortedData);
  };

  const menuProps = {
    items: [
      {
        label: 'Sort by number high to low',
        key: '1',
        icon: <UserOutlined />,
      },
      {
        label: 'Sort by number low to high',
        key: '2',
        icon: <UserOutlined />,
      },
    ],
    onClick: handleMenuClick,
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setSelectedGender(null);
    setSelectedAgeGroup(null);
    setSelectedRegion(null);
    fetchJSONData();
  };

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const handleAgeGroupChange = (value) => {
    setSelectedAgeGroup(value);
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };

  const handleSearch = () => {
    console.log('Search clicked');
    fetchJSONData();
  };

  const handleReset = () => {
    setSelectedGender(null);
    setSelectedAgeGroup(null);
    setSelectedRegion(null);
    fetchJSONData();
  };

  const buttonStyle = "bg-[#00BD90] text-white hover:bg-[#00A77D]";

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C', '#D0ED57'];

  const renderPieChart = (data) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    const pieData = data.map(item => ({
      name: item.name,
      value: (item.count / total) * 100
    }));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="90%"
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-8 p-8">
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          { label: 'Country', key: '1' },
          { label: 'State', key: '2' },
        ]}
        onChange={handleTabChange}
      />
      {activeTab === '1' && (
        <div className="space-y-10 flex flex-col items-center">
          <h2 className="text-xl font-bold text-center text-[#0F296D]">Prevalence of different diseases among Australian population</h2>
          <div className="flex items-center space-x-2">
            <Select 
              className="w-48" 
              placeholder="Gender" 
              onChange={handleGenderChange}
              value={selectedGender}
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
            <Select 
              className="w-48" 
              placeholder="Age Group"
              onChange={handleAgeGroupChange}
              value={selectedAgeGroup}
            >
              <Select.Option value="0-4 years">0-4 years</Select.Option>
              <Select.Option value="5-9 years">5-9 years</Select.Option>
              <Select.Option value="10-14 years">10-14 years</Select.Option>
              <Select.Option value="15-19 years">15-19 years</Select.Option>
              <Select.Option value="20-24 years">20-24 years</Select.Option>
              <Select.Option value="25-29 years">25-29 years</Select.Option>
              <Select.Option value="30-34 years">30-34 years</Select.Option>
              <Select.Option value="35-39 years">35-39 years</Select.Option>
              <Select.Option value="40-44 years">40-44 years</Select.Option>
              <Select.Option value="45-49 years">45-49 years</Select.Option>
              <Select.Option value="50-54 years">50-54 years</Select.Option>
              <Select.Option value="55-59 years">55-59 years</Select.Option>
              <Select.Option value="60-64 years">60-64 years</Select.Option>
              <Select.Option value="65-69 years">65-69 years</Select.Option>
              <Select.Option value="70-74 years">70-74 years</Select.Option>
              <Select.Option value="75-79 years">75-79 years</Select.Option>
              <Select.Option value="80-84 years">80-84 years</Select.Option>
              <Select.Option value="85 years and over">85 years and over</Select.Option>
            </Select>
            <Button className={buttonStyle} onClick={handleSearch}>Search</Button>
            <Button className={buttonStyle} onClick={handleReset}>Reset</Button>
            <Dropdown menu={menuProps}>
              <Button className={buttonStyle}>
                <Space>
                  Sort
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          <div className="w-[60vw] h-[600px] flex">
            <div className="w-[55%] h-full overflow-y-auto pr-4">
              {loading && <p>Loading data...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {isDataReady && data.length > 0 ? (
                <div className="space-y-4 min-h-full">
                  {data.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">{item.name}</span>
                        <span className="text-xs font-medium">{item.count.toLocaleString()}</span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300 ease-in-out" 
                          style={{ width: `${(item.count / Math.max(...data.map(d => d.count))) * 100}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !loading && !error && <p>No data available</p>
              )}
            </div>
            <div className="w-[45%] h-full">
              {isDataReady && data.length > 0 && renderPieChart(data)}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === '2' && (
        <div className="space-y-10 flex flex-col items-center">
          <h2 className="text-xl font-bold text-center text-[#0F296D]">Different diseases in different parts of Australia</h2>
          <div className="flex items-center space-x-2">
            <Select 
              className="w-48" 
              placeholder="Region"
              onChange={handleRegionChange}
              value={selectedRegion}
            >
              <Select.Option value="New South Wales">New South Wales</Select.Option>
              <Select.Option value="Victoria">Victoria</Select.Option>
              <Select.Option value="Queensland">Queensland</Select.Option>
              <Select.Option value="South Australia">South Australia</Select.Option>
              <Select.Option value="Western Australia">Western Australia</Select.Option>
              <Select.Option value="Tasmania">Tasmania</Select.Option>
              <Select.Option value="Northern Territory">Northern Territory</Select.Option>
              <Select.Option value="Australian Capital Territory">Australian Capital Territory</Select.Option>
            </Select>
            <Button className={buttonStyle} onClick={handleSearch}>Search</Button>
            <Button className={buttonStyle} onClick={handleReset}>Reset</Button>
            <Dropdown menu={menuProps}>
              <Button className={buttonStyle}>
                <Space>
                  Sort
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div className="w-[60vw] h-[600px] flex">
            <div className="w-[55%] h-full overflow-y-auto pr-4">
              {loading && <p>Loading data...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {isDataReady && data.length > 0 ? (
                <div className="space-y-4 min-h-full">
                  {data.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">{item.name}</span>
                        <span className="text-xs font-medium">{item.count.toLocaleString()}</span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300 ease-in-out" 
                          style={{ width: `${(item.count / Math.max(...data.map(d => d.count))) * 100}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !loading && !error && <p>No data available</p>
              )}
            </div>
            <div className="w-[45%] h-full">
              {isDataReady && data.length > 0 && renderPieChart(data)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}