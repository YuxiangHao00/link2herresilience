import { Select, Button, Dropdown, Space, message, Tabs } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './index.css';
import React, { useState, useEffect } from 'react';

export default function Component() {
  const mockDataCountry = [
    { name: "Heart Disease", percentage: 45 },
    { name: "Diabetes", percentage: 30 },
    { name: "Obesity", percentage: 60 },
    { name: "Asthma", percentage: 20 },
    { name: "Depression", percentage: 40 },
    { name: "Hypertension", percentage: 35 },
    { name: "Arthritis", percentage: 25 },
    { name: "Cancer", percentage: 15 },
    { name: "Stroke", percentage: 10 },
    { name: "Kidney Disease", percentage: 18 },
    { name: "Chronic Pain", percentage: 22 },
    { name: "Alzheimer's Disease", percentage: 5 }
  ];

  const mockDataState = [
    { name: "Asthma", percentage: 50 },
    { name: "Cancer", percentage: 20 },
    { name: "Diabetes", percentage: 10 },
    { name: "Stroke", percentage: 15 },
    { name: "Heart Disease", percentage: 5 },
    { name: "Hypertension", percentage: 38 },
    { name: "Obesity", percentage: 25 },
    { name: "Chronic Pain", percentage: 30 },
    { name: "Arthritis", percentage: 28 },
    { name: "Kidney Disease", percentage: 12 },
    { name: "Mental Health Issues", percentage: 35 },
    { name: "COPD", percentage: 22 }
  ];

  const [activeTab, setActiveTab] = useState('1');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = (tabKey) => {
    if (tabKey === '1') {
      // 请求Country的API
      setTimeout(() => {
        setData(mockDataCountry);
      }, 1000);
    } else if (tabKey === '2') {
      // 请求State的API
      setTimeout(() => {
        setData(mockDataState);
      }, 1000);
    }
  };

  const handleMenuClick = (e) => {
    message.info(`Sort by ${e.key === '1' ? 'high to low' : 'low to high'}.`);
    console.log('click', e);

    const sortedData = [...data].sort((a, b) => {
      if (e.key === '1') {
        return b.percentage - a.percentage; // 高到低排序
      } else {
        return a.percentage - b.percentage; // 低到高排序
      }
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
  };

  return (
    <div className="space-y-8 p-8">
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            label: 'Country',
            key: '1',
          },
          {
            label: 'State',
            key: '2',
          },
        ]}
        onTabClick={handleTabChange}
      />
      {activeTab === '1' && (
        <div className="space-y-10 flex flex-col items-center">
          <h2 className="text-xl font-bold text-center text-[#0F296D]">Prevalence of different diseases among Australian migrants</h2>
          <div className="flex items-center space-x-2">
            <Select className="w-48" placeholder="Gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
            <Select className="w-48" placeholder="Age Group">
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
            <Button className="bg-[#00BD90] text-white">Search</Button>

            <Dropdown menu={menuProps} className="w-24 bg-[#00BD90] text-white">
              <Button>
                <Space>
                  Sort
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          <div className="space-y-4 w-[40vw] h-[300px] overflow-y-auto"> {/* 设置固定高度和滚动条 */}
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-32">{item.name}</span>
                <div className="flex-1 h-4 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === '2' && (
        <div className="space-y-10 flex flex-col items-center">
          <h2 className="text-xl font-bold text-center text-[#0F296D]">Different diseases in different parts of Australia.</h2>
          <div className="flex items-center space-x-2">
            <Select className="w-48" placeholder="Region">
              <Select.Option value="nsw">New South Wales</Select.Option>
              <Select.Option value="vic">Victoria</Select.Option>
              <Select.Option value="qld">Queensland</Select.Option>
              <Select.Option value="sa">South Australia</Select.Option>
              <Select.Option value="wa">Western Australia</Select.Option>
              <Select.Option value="tas">Tasmania</Select.Option>
              <Select.Option value="nt">Northern Territory</Select.Option>
              <Select.Option value="act">Australian Capital Territory</Select.Option>
            </Select>
            <Button className="bg-[#00BD90] text-white">Search</Button>
            <Dropdown menu={menuProps} className="w-24 bg-[#00BD90] text-white">
              <Button>
                <Space>
                  Sort
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div className="space-y-4 w-[40vw] h-[300px] overflow-y-auto"> {/* 设置固定高度和滚动条 */}
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-32">{item.name}</span>
                <div className="flex-1 h-4 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
