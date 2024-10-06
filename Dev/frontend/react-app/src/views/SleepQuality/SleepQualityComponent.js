import React from 'react';
import ReactECharts from 'echarts-for-react';

const SleepQualityGauge = ({ overallQualityMean, thresholdLow, thresholdHigh }) => {

  const option = {
    series: [
      {
        grid: {
          left: '00%',
          right: '00%',
          top: '00%',
          bottom: '00%',
          containLabel: true
        },
        type: 'gauge',
        max: 10,
        center: ['50%', '60%'],
        radius: '90%', // 稍微减小半径以适应小屏幕
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [thresholdLow / 10, 'rgba(255, 0, 0, 0.6)'],
              [thresholdHigh / 10, 'rgba(255, 165, 0, 0.6)'],
              [10, 'rgba(60, 179, 113, 0.6)']
            ]
          }
        },
        pointer: {

        },
        axisTick: {
          length: 0,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -20,
          length: 20,
          lineStyle: {
            color: '#fff',
            width: 0
          }
        },
        axisLabel: {
          color: 'black',
          distance: 30,
          fontSize: 20,
          formatter: function (value) {
            if (value === 0) {
              return '0';
            } else if (value === 10) {
              return '10'
            } else if (value === Math.round(thresholdLow)) {
              return thresholdLow
            }
            else if (value === Math.round(thresholdHigh)) {
              return thresholdHigh
            }
          }
        },

        data: [
          {
            value: overallQualityMean
          }
        ]
      }
    ]
  };
  // 返回Doughnut组件
  return (
    <div style={{ width: '100%', height: '300px', maxWidth: '450px', margin: '0 auto' }}>
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }} // 使用 SVG 渲染以获得更好的缩放效果
      />
      {/* <Doughnut data={data} options={options} plugins={[gaugeText]} /> */}
    </div>
  );
};

export default SleepQualityGauge;