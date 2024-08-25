import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts 组件
import { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { registerMap } from 'echarts/core';
import Melbourne from '../../data/Melbourne.json'; // 引入 GeoJSON 文件
import Sydney from '../../data/Sydney.json'; // 引入 GeoJSON 文件


function City({city}) {
    const data_melbourne = [
        { "name": "Cremorne", "value": 20 },
        { "name": "Caulfield", "value": 30 },
        { "name": "Carnegie", "value": 40 },
        { "name": "Kingsville", "value": 50 },
        { "name": "South Kingsville", "value": 60 },
        { "name": "Tottenham", "value": 70 },
        { "name": "Balaclava", "value": 80 },
        { "name": "Fitzroy North", "value": 90 },
        { "name": "Kingsbury", "value": 100 },
        { "name": "Gardenvale", "value": 20 },
        { "name": "Windsor", "value": 30 },
        { "name": "Caulfield South", "value": 40 },
        { "name": "Maidstone", "value": 50 },
        { "name": "Hawthorn", "value": 60 },
        { "name": "Prahran", "value": 70 },
        { "name": "Essendon North", "value": 80 },
        { "name": "Seddon", "value": 90 },
        { "name": "Airport West", "value": 100 },
        { "name": "Black Rock", "value": 20 },
        { "name": "Williamstown North", "value": 30 },
        { "name": "Northcote", "value": 40 },
        { "name": "Fairfield", "value": 50 },
        { "name": "Thornbury", "value": 60 },
        { "name": "Princes Hill", "value": 70 },
        { "name": "Clifton Hill", "value": 80 },
        { "name": "Abbotsford", "value": 90 },
        { "name": "Brunswick East", "value": 100 },
        { "name": "Collingwood", "value": 20 },
        { "name": "Fitzroy", "value": 30 },
        { "name": "Brunswick", "value": 40 },
        { "name": "Carlton North", "value": 50 },
        { "name": "Carlton", "value": 60 },
        { "name": "Parkville", "value": 70 },
        { "name": "Melbourne (3000)", "value": 80 },
        { "name": "Armadale", "value": 90 },
        { "name": "Balwyn North", "value": 100 },
        { "name": "Toorak", "value": 20 },
        { "name": "Kooyong", "value": 30 },
        { "name": "Burnley", "value": 40 },
        { "name": "Kew East", "value": 50 },
        { "name": "Deepdene", "value": 60 },
        { "name": "Kew", "value": 70 },
        { "name": "Canterbury", "value": 80 },
        { "name": "Camberwell", "value": 90 },
        { "name": "Hawthorn East", "value": 100 },
        { "name": "Southbank", "value": 20 },
        { "name": "South Wharf", "value": 30 },
        { "name": "Ormond", "value": 40 },
        { "name": "Balwyn", "value": 50 },
        { "name": "Preston", "value": 60 },
        { "name": "Elwood", "value": 70 },
        { "name": "Docklands", "value": 80 },
        { "name": "Richmond", "value": 90 },
        { "name": "East Melbourne", "value": 100 },
        { "name": "South Yarra", "value": 20 },
        { "name": "Middle Park", "value": 30 },
        { "name": "Glen Iris", "value": 40 },
        { "name": "North Melbourne", "value": 50 },
        { "name": "Hadfield", "value": 60 },
        { "name": "Caulfield North", "value": 70 },
        { "name": "Brunswick West", "value": 80 },
        { "name": "Coburg North", "value": 90 },
        { "name": "Malvern East", "value": 100 },
        { "name": "Reservoir", "value": 20 },
        { "name": "Malvern", "value": 30 },
        { "name": "Glen Huntly", "value": 40 },
        { "name": "Coburg", "value": 50 },
        { "name": "Fawkner", "value": 60 },
        { "name": "Ashburton", "value": 70 },
        { "name": "Pascoe Vale South", "value": 80 },
        { "name": "Caulfield East", "value": 90 },
        { "name": "Travancore", "value": 100 },
        { "name": "Pascoe Vale", "value": 20 },
        { "name": "St Kilda East", "value": 30 },
        { "name": "South Melbourne", "value": 40 },
        { "name": "Essendon", "value": 50 },
        { "name": "Flemington", "value": 60 },
        { "name": "Albert Park", "value": 70 },
        { "name": "Murrumbeena", "value": 80 },
        { "name": "St Kilda", "value": 90 },
        { "name": "Glenroy", "value": 100 },
        { "name": "Kensington", "value": 20 },
        { "name": "Ripponlea", "value": 30 },
        { "name": "Hughesdale", "value": 40 },
        { "name": "St Kilda West", "value": 50 },
        { "name": "Strathmore", "value": 60 },
        { "name": "Moonee Ponds", "value": 70 },
        { "name": "Aberfeldie", "value": 80 },
        { "name": "Oak Park", "value": 90 },
        { "name": "Ascot Vale", "value": 100 },
        { "name": "Elsternwick", "value": 20 },
        { "name": "West Melbourne", "value": 30 },
        { "name": "Essendon Fields", "value": 40 },
        { "name": "McKinnon", "value": 50 },
        { "name": "Gowanbrae", "value": 60 },
        { "name": "Strathmore Heights", "value": 70 },
        { "name": "Bentleigh", "value": 80 },
        { "name": "Brighton East", "value": 90 },
        { "name": "Footscray", "value": 100 },
        { "name": "Port Melbourne", "value": 20 },
        { "name": "Maribyrnong", "value": 30 },
        { "name": "Bentleigh East", "value": 40 },
        { "name": "Brighton", "value": 50 },
        { "name": "Essendon West", "value": 60 },
        { "name": "Seaholme", "value": 70 },
        { "name": "Niddrie", "value": 80 },
        { "name": "Hampton East", "value": 90 },
        { "name": "Yarraville", "value": 100 },
        { "name": "Spotswood", "value": 20 },
        { "name": "Hampton", "value": 30 },
        { "name": "Newport", "value": 40 },
        { "name": "Avondale Heights", "value": 50 },
        { "name": "West Footscray", "value": 60 },
        { "name": "Braybrook", "value": 70 },
        { "name": "Beaumaris", "value": 80 },
        { "name": "Williamstown", "value": 90 },
        { "name": "Sandringham", "value": 100 },
        { "name": "Altona North", "value": 20 }
    ]

    const data_sydney = [
        { "name": "Sydney", "value": 45 },
        { "name": "Woollahra", "value": 76 },
        { "name": "Barangaroo", "value": 23 },
        { "name": "Beaconsfield (NSW)", "value": 85 },
        { "name": "Erskineville", "value": 34 },
        { "name": "Newtown (NSW)", "value": 67 },
        { "name": "Rushcutters Bay", "value": 58 },
        { "name": "Edgecliff", "value": 12 },
        { "name": "Zetland", "value": 88 },
        { "name": "St Peters (NSW)", "value": 47 },
        { "name": "Chippendale", "value": 63 },
        { "name": "Alexandria", "value": 94 },
        { "name": "Annandale (NSW)", "value": 77 },
        { "name": "Haymarket", "value": 42 },
        { "name": "Darlinghurst", "value": 55 },
        { "name": "Camperdown (NSW)", "value": 21 },
        { "name": "Dawes Point", "value": 38 },
        { "name": "Centennial Park (NSW)", "value": 61 },
        { "name": "Darlington (Sydney - NSW)", "value": 10 },
        { "name": "Eveleigh", "value": 89 },
        { "name": "Waterloo (NSW)", "value": 48 },
        { "name": "Elizabeth Bay", "value": 79 },
        { "name": "Moore Park", "value": 35 },
        { "name": "Forest Lodge", "value": 68 },
        { "name": "Millers Point", "value": 26 },
        { "name": "Rosebery (NSW)", "value": 52 },
        { "name": "Glebe (NSW)", "value": 78 },
        { "name": "Paddington (NSW)", "value": 90 },
        { "name": "Potts Point", "value": 59 },
        { "name": "Surry Hills", "value": 33 },
        { "name": "Pyrmont", "value": 44 },
        { "name": "Redfern", "value": 81 },
        { "name": "The Rocks (Sydney - NSW)", "value": 62 },
        { "name": "Ultimo", "value": 73 },
        { "name": "Woolloomooloo", "value": 56 }
    ]

    const mapData = city === 'Melbourne' ? Melbourne : Sydney;
    const seriesData = city === 'Melbourne' ? data_melbourne : data_sydney; 
    registerMap('city', mapData); 

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
            map: 'city',//必须与初始注册的地图名称一致;
            roam: true,
            aspectScale: 1,
            scaleLimit: {//通过鼠标控制的缩放
                min: 1,
                max: 10
            },
            zoom: 1,//当前缩放比例
            top: 50,//组件离容器上方的距离
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
            name: "Allergic Pollens",
            type: "map",
            geoIndex: 0,
            data: seriesData
        }]
    };


    return (
        <div>
            <ReactECharts option={option_map} style={{ height: '800px', width: '100%' }} />
        </div>


    );
}

export default City;