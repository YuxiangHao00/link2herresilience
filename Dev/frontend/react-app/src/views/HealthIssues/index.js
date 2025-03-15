import React, { useState, useEffect } from 'react';
import { Select, Button, Dropdown, Space, message, Tabs } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';  // 导入 useNavigate
import longTermConditionData from '../../data/long-term_condition.json';
import './index.css';

export default function HealthIssuesComponent() {
  const navigate = useNavigate();  // 使用 useNavigate hook
  const [activeTab, setActiveTab] = useState('1');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Female');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('20-24 years');
  const [selectedRegion, setSelectedRegion] = useState('Victoria');

  useEffect(() => {
    console.log('Component mounted, fetching data...');
    fetchJSONData();
  }, []);

  const fetchJSONData = (isReset = false) => {
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
        if (isReset) {
          // 重置时，使用默认的性别和年龄组
          filteredData = filteredData.filter(item => 
            item.region_name === null &&
            item.gender === 'Female' &&
            item.age_group === '20-24 years'
          );
        } else {
          filteredData = filteredData.filter(item => 
            item.region_name === null &&
            item.gender === selectedGender &&
            item.age_group === selectedAgeGroup
          );
        }
      } else if (activeTab === '2') { // State tab
        if (isReset) {
          // 重置时，使用默认的州（维多利亚州）
          filteredData = filteredData.filter(item => 
            item.region_name === 'Victoria' &&
            item.gender === null &&
            item.age_group === null
          );
        } else {
          filteredData = filteredData.filter(item => 
            item.region_name === selectedRegion &&
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
    if (key === '1') {
      setSelectedGender('Female');
      setSelectedAgeGroup('20-24 years');
      setSelectedRegion(null);
    } else {
      setSelectedGender(null);
      setSelectedAgeGroup(null);
      setSelectedRegion('Victoria');
    }
    fetchJSONData(true);
  };

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const handleAgeGroupChange = (value) => {
    setSelectedAgeGroup(value);
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    if (activeTab === '2') {
      fetchJSONData();
    }
  };

  const handleSearch = () => {
    console.log('Search clicked');
    fetchJSONData();
  };

  const isSearchDisabled = () => {
    if (activeTab === '1') {
      // 国家标签页：需要同时选择性别和年龄组
      return !(selectedGender && selectedAgeGroup);
    } else if (activeTab === '2') {
      // 州标签页：只需要选择州
      return !selectedRegion;
    }
    return true; // 默认禁用
  };

  const handleReset = () => {
    if (activeTab === '1') {
      setSelectedGender('Female');
      setSelectedAgeGroup('20-24 years');
    } else {
      setSelectedRegion('Victoria');
    }
    fetchJSONData(true);
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

  const handleSuburbFinderClick = () => {
    navigate('/suburb-finder');  // 跳转到 SuburbFinder 页面
  };

  return (
    <div className="space-y-4 sm:space-y-8 p-4 sm:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-oregano text-blue-800 mb-4 text-left" style={{ marginTop: '1rem' }}>Empowering Migrant Women for a Healthier Future</h1>
        <p className="text-black text-lg mb-2">
          Our platform provides you with insights into the most common diseases affecting migrant women across Australia. The information is presented in an easy-to-understand format, allowing you to explore health trends based on gender, age, and location.
        </p>
        <p className="text-black text-lg mb-2">
         By default, you'll see the most prevalent diseases among young women aged 20-24 years in Australia. This age and gender group is specifically selected to reflect the health concerns of young migrant women like you.
        </p>
        <p className="text-black text-lg">
          Explore by Gender and Age
        </p>
        <p className="text-black text-lg">
          Want to see how diseases differ by gender or age?
        </p>
        <p className="text-black text-lg">
          Simply use the gender filter to switch between health data for men and women.
        </p>
      </div>

      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          { label: 'Health Issues By Age', key: '1' },
          { label: 'Health Issues By Region', key: '2' },
        ]}
        onChange={handleTabChange}
      />

      {activeTab === '1' && (
        <div className="space-y-6 sm:space-y-10 flex flex-col items-center">
          <h2 className="text-lg sm:text-xl font-bold text-center text-[#0F296D]">Common Health Issues (aggregate by age and gender)</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Select 
              className="w-full sm:w-48" 
              placeholder="Gender" 
              onChange={handleGenderChange}
              value={selectedGender}
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
            <Select 
              className="w-full sm:w-48" 
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
            <Button 
              className={`${buttonStyle} w-full sm:w-auto ${isSearchDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={handleSearch}
              disabled={isSearchDisabled()}
            >
              Search
            </Button>
            <Button className={`${buttonStyle} w-full sm:w-auto`} onClick={handleReset}>Reset</Button>
            <Dropdown menu={menuProps}>
              <Button className={`${buttonStyle} w-full sm:w-auto`}>
                <Space>
                  Sort
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          <div className="w-full sm:w-[60vw] h-[400px] sm:h-[600px] flex flex-col sm:flex-row">
            <div className="w-full sm:w-[55%] h-1/2 sm:h-full overflow-y-auto pr-0 sm:pr-4 mb-4 sm:mb-0">
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
            <div className="w-full sm:w-[45%] h-1/2 sm:h-full">
              {isDataReady && data.length > 0 && renderPieChart(data)}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === '2' && (
        <div className="space-y-6 sm:space-y-10 flex flex-col items-center">
          <h2 className="text-lg sm:text-xl font-bold text-center text-[#0F296D]">Common Health Issues in Different Australian States</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Select 
              className="w-full sm:w-48" 
              placeholder="Region"
              onChange={handleRegionChange}
              value={selectedRegion}
              defaultValue="Victoria"
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
            <Button 
              className={`${buttonStyle} w-full sm:w-auto ${isSearchDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={handleSearch}
              disabled={isSearchDisabled()}
            >
              Search
            </Button>
            <Button className={`${buttonStyle} w-full sm:w-auto`} onClick={handleReset}>Reset</Button>
            <Dropdown menu={menuProps}>
              <Button className={`${buttonStyle} w-full sm:w-auto`}>
                <Space>
                  Sort
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div className="w-full sm:w-[60vw] h-[400px] sm:h-[600px] flex flex-col sm:flex-row">
            <div className="w-full sm:w-[55%] h-1/2 sm:h-full overflow-y-auto pr-0 sm:pr-4 mb-4 sm:mb-0">
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
            <div className="w-full sm:w-[45%] h-1/2 sm:h-full">
              {isDataReady && data.length > 0 && renderPieChart(data)}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">Worried about Asthma being so dominant in Australia? We've got your back, with our Air Quality indicator based on particular suburbs, know your safe place to be! Click the button to explore more!</p>
        <Button 
          onClick={handleSuburbFinderClick}
          className="bg-[#00BD90] hover:bg-[#00A77D] text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Air Quality Index
        </Button>
      </div>
    </div>
  );
}
