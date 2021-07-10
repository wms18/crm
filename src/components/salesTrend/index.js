import React from 'react'
import { useEffect } from 'react'

function SalesTrend(props) {
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
                data: ['回款金额', '合同金额']
                // data:['']
            },
            yAxis: {
                type: 'value',
                // data: [1000, 2000,5000,8000,120000]
            },

            series: [{
                data: [props.data.contract.returnMoneyTotal, {
                    value: props.data.contract.contractPrice,
                    itemStyle: {
                        color: '#a90000'
                    }
                }, 1000, 3000, 5000, 7000],
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