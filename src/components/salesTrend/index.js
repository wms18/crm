import React from 'react'
import { useEffect } from 'react'

function SalesTrend() {
    useEffect(() => {
        const echarts = require('echarts/lib/echarts');
        require('echarts/lib/component/grid');
        require('echarts/lib/chart/bar');

        if (document.getElementById('salesTrend-main')) {
            var myChart = echarts.init(document.getElementById('salesTrend-main'));
        }

        var option;

        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, {
                    value: 200,
                    itemStyle: {
                        color: '#a90000'
                    }
                }, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        };

        option && myChart.setOption(option);
    }, [])

    return (
        <div id="salesTrend-main" style={{
            width: 400, height: 300,
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            margin: 'auto'
        }}></div>
    )
}

export default SalesTrend