import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts 组件
import { registerMap } from 'echarts/core';
import Melbourne from '../../data/Melbourne.json'; // 引入 GeoJSON 文件
import Sydney from '../../data/Sydney.json'; // 引入 GeoJSON 文件

function City({ city, data }) {
    const mapData = city === 'Melbourne' ? Melbourne : Sydney;
    registerMap('city', mapData); 

    const getAQILevel = (value) => {
        if (value <= 50) return 'Good';
        if (value <= 100) return 'Fair';
        if (value <= 150) return 'Poor';
        if (value <= 200) return 'Very poor';
        return 'Extremely poor';
    };

    const option_map = {
        title: {
            top: "5%",
            x: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: ({ name, value }) => `${name}<br/>AQI: ${value}<br/>Level: ${getAQILevel(value)}`,
        },
        visualMap: {
            type: 'piecewise',
            pieces: [
                { max: 50, label: 'Good', color: '#7ec251' },
                { min: 51, max: 100, label: 'Fair', color: '#f9c446' },
                { min: 101, max: 150, label: 'Poor', color: '#ef8d3e' },
                { min: 151, max: 200, label: 'Very poor', color: '#c04c4d' },
                { min: 201, label: 'Extremely poor', color: '#76235d' }
            ],
            orient: 'horizontal',
            right: '10%',
            top: '10%',
            textStyle: {
                color: '#000'
            }
        },
        geo: {
            map: 'city', // 必须与初始注册的地图名称一致
            roam: true,
            aspectScale: 1,
            scaleLimit: {
                min: 1,
                max: 10
            },
            zoom: 1, // 当前缩放比例
            top: 50, // 组件离容器上方的距离
            label: {
                normal: {
                    show: false,
                    color: "#000"
                },
                emphasis: {
                    show: true,
                    color: "#fff"
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '',
                    borderColor: "rgba(0, 0, 0, 0.5)"
                },
            }
        },
        series: [{
            name: "Air Quality",
            type: "map",
            geoIndex: 0,
            data: data  // 使用传入的data参数
        }]
    };

    return (
        <div>
            <ReactECharts option={option_map} style={{ height: '800px', width: '100%' }} />
        </div>
    );
}

export default City;
