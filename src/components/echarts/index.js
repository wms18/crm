import React, { useEffect, useState } from 'react'
import { Select } from 'antd';


// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const { Option } = Select


function EchartsTest(props) {


    let [finishRate, setFinishRate] = useState()
    let [contractGoal, setContractGoal] = useState()
    useEffect(() => {

        console.log('图表数据', props.data);
        // finishRate = props.data.contract ?
        //     props.data.contract.finishRate : 0
        // setFinishRate(finishRate)
        // contractGoal = props.contract ? props.contract.returnMoneyGoal : 0
        // setContractGoal(contractGoal)


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
                    value:
                        finishRate ? finishRate : 0
                }]
            }]
        };

        option && myChart.setOption(option);




    }, [props, finishRate, contractGoal])

    function changeData(val) {
        console.log(val);
        if (val == '回款金额') {
            contractGoal = props.data.contract.returnMoneyGoal
            setContractGoal(contractGoal)
            finishRate = Math.ceil(props.data.contract.finishRate)
            setFinishRate(finishRate)
        } else {
            contractGoal = props.data.payment.contractGoal
            setContractGoal(contractGoal)
            finishRate = Math.ceil(props.data.payment.finishRate)
            setFinishRate(finishRate)
        }
    }


    return (
        <div >
            <div style={{ padding: '10px 10px 0 0', width: '100%', textAlign: 'right' }} >
                <Select style={{ width: 100 }}
                    onChange={changeData}
                // defaultValue='回款金额'
                >
                    <Option value='回款金额'>回款金额</Option>
                    <Option value='合同金额' >合同金额</Option>
                </Select>
            </div>


            <div id="echarts-main" style={{
                width: 400, height: 300,
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                margin: 'auto',
                // border: '1px solid red'
            }}></div>

            <div style={{ position: 'absolute', display: 'flex', bottom: "0", width: '100%', flexDirection: 'row', justifyContent: 'space-around', padding: '0 0 10px 0' }} >
                <div style={{ display: 'inline-block', padding: "0 10px" }} >目标：{contractGoal}元</div>
                <div style={{ display: 'inline-block', padding: "0 10px" }}  >回款金额：{props.data.contract.returnMoneyTotal}元</div>
                <div style={{ display: 'inline-block', padding: "0 10px" }} >合同金额：{props.data.payment.contractPrice}元</div>
            </div>
        </div>
    );
}

export default EchartsTest



