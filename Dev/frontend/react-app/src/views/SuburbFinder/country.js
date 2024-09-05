import React, { useState, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { registerMap } from 'echarts/core';
import geoJson from '../../data/australian-states.json';
import axios from 'axios';

function Country() {
    const [stateData, setStateData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        registerMap('australia', geoJson);

        const fetchData = async () => {
            try {
                const response = await axios.get('https://link2herresilience.com.au/air_quality/v1/states');
                console.log('API response:', response.data);
                
                const transformedData = response.data.map(item => ({
                    name: item.state,
                    value: item.aqi,
                    date: item.date ?? 'N/A',
                    aqc: item.aqc ?? 'N/A'
                }));
                
                setStateData(transformedData);
            } catch (error) {
                console.error('Error fetching state data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getAQILevel = (value) => {
        if (value <= 50) return 'Good';
        if (value <= 100) return 'Fair';
        if (value <= 150) return 'Poor';
        if (value <= 200) return 'Very poor';
        return 'Extremely poor';
    };

    const option = useMemo(() => ({
        title: {
            text: 'Australia Air Quality Index',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: ({ name, value, data }) => {
                if (!data) return `${name}: No data available`;
                return `${name}<br/>AQI: ${value}<br/>Level: ${getAQILevel(value)}<br/>Date: ${data.date}`;
            }
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
            orient: 'vertical',
            right: '5%',
            top: 'center',
            textStyle: {
                color: '#000'
            }
        },
        series: [{
            name: 'Australia AQI',
            type: 'map',
            map: 'australia',
            roam: true,
            data: stateData,
            emphasis: {
                label: {
                    show: true
                }
            }
        }]
    }), [stateData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <ReactECharts option={option} style={{ height: '800px', width: '100%' }} />;
}

export default Country;
