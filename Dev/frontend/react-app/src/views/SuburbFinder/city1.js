import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { registerMap } from 'echarts/core';
import Melbourne from '../../data/Melbourne.json';
import axios from 'axios';

function City({ city }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Manual mapping between API site names and GeoJSON feature names
    const nameMapping = {
        'Alphington': 'Alphington',
        'Altona North': 'Altona North',
        'Bendigo': 'Bendigo',
        'Box Hill': 'Box Hill',
        'Bright': 'Bright',
        'Brighton': 'Brighton',
        'Brooklyn': 'Brooklyn',
        'Churchill': 'Churchill',
        'Dandenong': 'Dandenong',
        'Footscray': 'Footscray',
        'Geelong South': 'Geelong South',
        'Kingsville': 'Kingsville',
        'Macleod': 'Macleod',
        'Melbourne CBD': 'Melbourne',
        'Melton': 'Melton',
        'Mildura': 'Mildura',
        'Moe': 'Moe',
        'Mooroolbark': 'Mooroolbark',
        'Morwell East': 'Morwell East',
        'Morwell South': 'Morwell South',
        'Point Cook': 'Point Cook',
        'Rosedale': 'Rosedale',
        'Spotswood': 'Spotswood',
        'Stawell': 'Stawell',
        'Swan Hill': 'Swan Hill',
        'Traralgon': 'Traralgon',
        'Wangaratta': 'Wangaratta',
        'Yinnar': 'Yinnar',
        'Toorak': 'Toorak',
        'Hampton East': 'Hampton East',
        'McKinnon': 'McKinnon',
        'Glen Iris': 'Glen Iris'
    };
    

    const findFeatureName = (apiSiteName, geojsonFeatures) => {
        const mappedName = nameMapping[apiSiteName];
        if (mappedName) {
            for (let feature of geojsonFeatures) {
                if (feature.properties.name.toLowerCase() === mappedName.toLowerCase()) {
                    return feature.properties.name;
                }
            }
        }
        return null;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let state = '';
                if (city === 'Melbourne') state = 'vic';

                const response = await axios.get(`https://link2herresilience.com.au/air_quality/v1/suburbs?state=${state}`);
                const geojsonFeatures = Melbourne.features;

                const transformedData = response.data.map(item => {
                    const matchedName = findFeatureName(item.site, geojsonFeatures);
                    return matchedName ? {
                        name: matchedName,
                        value: item.pm2_5 !== null && item.pm2_5 !== undefined ? item.pm2_5 : 0,
                        date: item.date,
                        pm10: item.pm10,
                        co: item.co,
                        no2: item.no2,
                        so2: item.so2,
                        aqc: item.aqc,
                        visibility: item.visibility
                    } : null;
                }).filter(item => item !== null);

                console.log('Transformed data:', transformedData); // For debugging

                setData(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city]);

    registerMap('city', Melbourne);

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
            formatter: ({ name, data }) => {
                if (!data) return `${name}: No data`;
                return `${name}<br/>Date: ${data.date}<br/>PM2.5: ${data.value}<br/>PM10: ${data.pm10}<br/>CO: ${data.co}<br/>NO2: ${data.no2}<br/>SO2: ${data.so2}<br/>AQC: ${data.aqc}<br/>Visibility: ${data.visibility}`;
            },
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
        geo: {
            map: 'city',
            roam: true,
            aspectScale: 1,
            scaleLimit: {
                min: 1,
                max: 10
            },
            zoom: 1,
            top: 50,
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
                    areaColor: '#f0f0f0', // Default color for unmatched areas (light grey)
                    borderColor: "rgba(0, 0, 0, 0.5)"
                },
                emphasis: {
                    areaColor: '#cfcfcf' // Emphasized color when hovering (slightly darker grey)
                }
            }
        },
        series: [{
            name: "Air Quality",
            type: "map",
            geoIndex: 0,
            data: data
        }]
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ReactECharts option={option_map} style={{ height: '800px', width: '100%' }} />
        </div>
    );
}

export default City;
