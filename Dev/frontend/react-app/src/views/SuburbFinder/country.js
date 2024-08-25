import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts 组件
import { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { registerMap } from 'echarts/core';
import geoJson from '../../data/australian-states.json'; // 引入 GeoJSON 文件

function Country() {

  window.dataList = [
    { name: "Northern Territory", value: 10 },
    { name: "New South Wales", value: 114 },
    { name: "Victoria", value: 45 },
    { name: "Queensland", value: 76 },
    { name: "Western Australia", value: 75 },
    { name: "South Australia", value: 30 },
    { name: "Tasmania", value: 20 },
    { name: "Australian Capital Territory", value: 15 },
  ];
  registerMap('australia', geoJson);
  const option = {
    title: {
      top: "5%",
      x: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
    },
    visualMap: {
      min: 0,
      max: 200,
      calculable: true,
      inRange: {
        color: ['#d4f1c4', '#097F54'] // 修改为绿色渐变
      },
      textStyle: {
        color: '#000'
      },
      show: true,
      orient: 'horizontal',
      right: '10%',
      top: '10%'
    },
    geo: {
      map: 'australia',//必须与初始注册的地图名称一致;
      roam: true,
      aspectScale: 1,
      scaleLimit: {//通过鼠标控制的缩放
        min: 1,
        max: 2
      },
      zoom: 1,//当前缩放比例
      top: 120,//组件离容器上方的距离
      label: {
        normal: {
          show: true,
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
      name: "air quality",
      type: "map",
      geoIndex: 0,
      data: window.dataList
    }]
  };

  return (
    <ReactECharts option={option} style={{ height: '800px', width: '100%' }} />
  );
}

export default Country;