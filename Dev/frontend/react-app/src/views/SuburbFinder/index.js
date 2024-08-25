import React, { useState } from 'react';
import { Tabs, Select, Button } from 'antd';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts 组件
import './index.css';
import Country from './country';
import City1 from './city1';
import City2 from './city2';


function SuburbFinder() {
  const [showCity, setShowCity] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Melbourne');
  const [activeTab, setActiveTab] = useState('1'); // Added state for active tab
  const [tempCity1, setTempCity1] = useState('');
  const [tempCity2, setTempCity2] = useState('Melbourne');


  const citys = [
    { name: "Melbourne" },
    { name: "Sydney" },
  ];

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="text-center">
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            label: 'air quality',
            key: '1',
          },
          {
            label: 'Allergic pollens',
            key: '2',
          },
        ]}
        onTabClick={handleTabChange}
      />
      {/* Air Quality section */}
      {activeTab === '1' && (
        <div><div className='flex justify-center gap-4 mt-[40px]'>
          <Select className="w-[300px]" placeholder="City" value={tempCity1} onChange={value => setTempCity1(value)}>
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
          <Button className="bg-[#00BD90] text-white" onClick={() => {setShowCity(false);setTempCity1('')}}>Return</Button>

        </div>
          {showCity ? <City1 city={selectedCity} /> : <Country />}
        </div>

      )}
      {/* Allergic Pollens section */}
      {activeTab === '2' && (
        <div>
          <div className='flex justify-center gap-4 mt-[40px]'>
            <Select className="w-[300px]" value={tempCity2} placeholder="City" onChange={value => setTempCity2(value)}>
              {citys.map((item) => (
                <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
            <Button
              className="bg-[#00BD90] text-white"
              onClick={() => { setShowCity(true); setSelectedCity(tempCity2); }}
              disabled={!tempCity2}
            >
              Switch
            </Button>

          </div>
          <City2 city={selectedCity} />
        </div>

      )}
    </div>
  );
}

export default SuburbFinder;