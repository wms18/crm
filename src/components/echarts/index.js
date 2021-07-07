import React, { useEffect } from 'react'


// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


function EchartsTest(props) {

    useEffect(() => {

        console.log(props.data);


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
                    value: parseInt(props.data.rG / props.data.cG ?
                        props.data.rG / props.data.cG
                        :
                        0
                    ) * 100
                }]
            }]
        };

        option && myChart.setOption(option);




    }, [props.data])


    return (
        <div >
            <div id="echarts-main" style={{
                width: 400, height: 300,
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                margin: 'auto',
                // border: '1px solid red'
            }}></div>

            <div style={{ position: 'absolute', left: '50%', bottom: "0", width: '290px', transform: 'translate(-50%, -50%)', flexDirection: 'row' }} >
                <div style={{ display: 'inline-block', padding: "0 10px" }}  >回款金额：{props.data.rG}</div>
                <div style={{ display: 'inline-block', padding: "0 10px" }} >合同金额：{props.data.cG}</div>
            </div>
        </div>
    );
}

export default EchartsTest



