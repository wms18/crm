import React, { useEffect } from 'react'


// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


function EchartsTest() {

    useEffect(() => {


        const echarts = require('echarts/lib/echarts');
        require('echarts/lib/chart/gauge');

        // var chartDom = document.getElementById('main');
        if (document.getElementById('echarts-main')) {
            var myChart = echarts.init(document.getElementById('echarts-main'))
        }
        var option;

        option = {
            series: [{
                type: 'gauge',
                progress: {
                    show: true,
                    width: 18
                },
                axisLine: {
                    lineStyle: {
                        width: 18
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    length: 15,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: 20,
                    color: '#999',
                    fontSize: 15
                },
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 20,
                    itemStyle: {
                        borderWidth: 10
                    }
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    fontSize: 40,
                    offsetCenter: [0, '70%']
                },
                data: [{
                    value: 70
                }]
            }]
        };

        option && myChart.setOption(option);




    }, [])


    return (
        <div id="echarts-main" style={{
            width: 400, height: 300,
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            margin: 'auto'
        }}></div>
    );
}

export default EchartsTest



