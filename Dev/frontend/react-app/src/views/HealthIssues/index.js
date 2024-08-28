import { Select, Button, Dropdown, Space, message, Tabs } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './index.css';
import React, { useState } from 'react';

export default function Component() {
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const [activeTab, setActiveTab] = useState('1');

  const menuProps = {
    items: [
      {
        label: 'sort by number high to low',
        key: '1',
        icon: <UserOutlined />,
      },
      {
        label: 'sort by number low to high',
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
            <Select className="w-48" placeholder="year spent in Aus">
              <Select.Option value="1">1 year</Select.Option>
              <Select.Option value="2">2 years</Select.Option>
            </Select>
            <Select className="w-48" placeholder="Place of birth">
              <Select.Option value="place1">Place 1</Select.Option>
              <Select.Option value="place2">Place 2</Select.Option>
            </Select>
            <Select className="w-48" placeholder="Gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
            <Select className="w-48" placeholder="Age Group">
              <Select.Option value="group1">Group 1</Select.Option>
              <Select.Option value="group2">Group 2</Select.Option>
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

          <div className="space-y-4 w-[40vw]">
            {["blue", "orange", "purple", "red", "green", "yellow"].map((color, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-32">Disease Name</span>
                <div className="flex-1 h-4 bg-gray-300 rounded-full overflow-hidden">
                  <div className={`h-full bg-${color}-500`} style={{ width: "50%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === '2' && (

        <div className="space-y-10   flex flex-col items-center">
          <h2 className="text-xl font-bold text-center text-[#0F296D]">Different diseases in different parts of Australia.</h2>
          <div className="flex items-center space-x-2">
            <Select className="w-48" placeholder="Suburb">
              <Select.Option value="suburb1">Suburb 1</Select.Option>
              <Select.Option value="suburb2">Suburb 2</Select.Option>
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
          <div className="space-y-4 w-[40vw]">
            {["blue", "orange", "purple", "red", "green", "yellow"].map((color, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-32">Disease Name</span>
                <div className="flex-1 h-4 bg-gray-300 rounded-full overflow-hidden">
                  <div className={`h-full bg-${color}-500`} style={{ width: "50%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}