import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { registerMap } from 'echarts/core';
import geoJson from '../../data/australian-states.json';
import axios from 'axios';

function Country() {
  const [stateData, setStateData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5001/air_quality/v1/states');
        const data = response.data;


        const processedData = data.map(state => ({
          name: state.state,
          value: state.aqi, 
          date: state.date,
          aqc: state.aqc
        }));

        setStateData(processedData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  registerMap('australia', geoJson);

  const option = {
    title: {
      top: "5%",
      x: 'center',
      text: 'Australia Air Quality Index',
      textStyle: {
        color: '#000'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        if (!params.data) {
          return 'No data available'; // 当数据不存在时，显示提示
        }

        const { name, value, date, aqc } = params.data;
        return `${name}<br/>Updated: ${date}<br/>AQI: ${value}<br/>Condition: ${aqc}`;
      }
    },
    visualMap: {
      min: 0,
      max: 300, // 根据您的AQI范围调整
      calculable: true,
      inRange: {
        color: ['#d4f1c4', '#097F54']
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
      map: 'australia',
      roam: true,
      aspectScale: 1,
      scaleLimit: {
        min: 1,
        max: 2
      },
      zoom: 1,
      top: 120,
      label: {
        show: true,
        color: "#000"
      },
      itemStyle: {
        areaColor: '#f3f3f3',
        borderColor: "rgba(0, 0, 0, 0.5)"
      },
      emphasis: {
        label: {
          color: "#fff"
        },
        itemStyle: {
          areaColor: '#369'
        }
      }
    },
    series: [{
      name: "Air Quality Index",
      type: "map",
      geoIndex: 0,
      data: stateData  // 使用处理后的数据
    }]
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ReactECharts option={option} style={{ height: '800px', width: '100%' }} />
  );
}

export default Country;
