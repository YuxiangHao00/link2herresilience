import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { registerMap } from 'echarts/core';
import geoJson from '../../data/australian-states.json';
import axios from 'axios'; // Make sure to install axios: npm install axios

function Country() {
  const [stateData, setStateData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual AWS endpoint
        const response = await axios.get('https://your-aws-endpoint.com/air_quality/v1/states');
        const data = response.data;
        
        // Process the data to get the latest AQI for each state
        const processedData = Object.entries(data).map(([state, values]) => {
          const latestDate = Object.keys(values).sort().pop();
          return { 
            name: state, 
            value: values[latestDate].AQI 
          };
        });

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
      formatter: '{b}: {c}'
    },
    visualMap: {
      min: 0,
      max: 300, // Adjust based on your AQI range
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
      name: "Air Quality Index",
      type: "map",
      geoIndex: 0,
      data: stateData
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