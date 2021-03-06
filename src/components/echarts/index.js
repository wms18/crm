import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import { Gauge } from '@ant-design/charts';


// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const { Option } = Select


function EchartsTest(props) {



    let [finishRate, setFinishRate] = useState(
        Math.ceil(props.data.contract.finishRate)
    )
    let [contractGoal, setContractGoal] = useState(
        props.data.contract.returnMoneyGoal
    )
    let [returnMoneyTotal, setReturnMoneyTotal] = useState(
        props.data.contract.returnMoneyTotal
    )
    let [contractPrice, setContractPrice] = useState(
        props.data.contract.contractPrice
    )
    let [data, setData] = useState([])
    let [config, setConfig] = useState()
    useEffect(() => {

        props.data ? setData(props.data) : setData([])


        // finishRate = data.contract ? data.contract.finishRate : 0
        // setFinishRate(finishRate)

        // contractGoal = data.contract ? data.contract.returnMoneyGoal : 0
        // setContractGoal(contractGoal)

        // returnMoneyTotal = data.contract ? data.contract.returnMoneyTotal : 0
        // setReturnMoneyTotal(returnMoneyTotal)


        // contractPrice = data.contract ? data.contract.contractPrice : 0
        // setContractPrice(contractPrice)




        // const echarts = require('echarts/lib/echarts');
        // require('echarts/lib/chart/gauge');



        // // var chartDom = document.getElementById('main');
        // if (document.getElementById('echarts-main')) {
        //     var myChart = echarts.init(document.getElementById('echarts-main'))
        // }
        // var option;

        // option = {
        //     series: [{
        //         type: 'gauge',
        //         progress: {
        //             show: true,
        //             width: 18
        //         },
        //         axisLine: {
        //             lineStyle: {
        //                 width: 18
        //             }
        //         },
        //         axisTick: {
        //             show: false
        //         },
        //         splitLine: {
        //             length: 15,
        //             lineStyle: {
        //                 width: 2,
        //                 color: '#999'
        //             }
        //         },
        //         axisLabel: {
        //             distance: 20,
        //             color: '#999',
        //             fontSize: 15
        //         },
        //         anchor: {
        //             show: true,
        //             showAbove: true,
        //             size: 20,
        //             itemStyle: {
        //                 borderWidth: 10
        //             }
        //         },
        //         title: {
        //             show: false
        //         },
        //         detail: {
        //             valueAnimation: true,
        //             fontSize: 40,
        //             offsetCenter: [0, '70%']
        //         },
        //         data: [{
        //             value:
        //                 finishRate ? finishRate : 0
        //         }]
        //     }]
        // };

        // option && myChart.setOption(option);



        var config = {
            percent: finishRate/100,
            limitInPlot:true,
            type: 'meter',
            // innerRadius: 0.75,
            range: {
                ticks: [0, 1 / 3, 2 / 3, 1],
                color: ['#F4664A', '#FAAD14', '#30BF78'],
            },
            indicator: {
                pointer: { style: { stroke: '#D0D0D0' } },
                pin: { style: { stroke: '#D0D0D0' } },
            },
            statistic: {
                content: {
                    style: {
                        fontSize: '25px',
                        lineHeight: '25px',
                    },
                },
            },
        };

        // setConfig({...config})





    }, [props, finishRate])

    function changeData(val) {
        console.log(val);
        if (val == '合同金额') {

            contractGoal = data.payment.contractGoal
            setContractGoal(contractGoal)

            finishRate = Math.ceil(data.payment.finishRate)
            setFinishRate(finishRate)

            contractPrice = data.payment.contractPrice
            setContractPrice(contractPrice)

            returnMoneyTotal = data.payment.returnMoneyTotal
            setReturnMoneyTotal(returnMoneyTotal)

            var config = {
                percent: finishRate/100,
                limitInPlot:true,
                type: 'meter',
                // innerRadius: 0.75,
                range: {
                    ticks: [0, 1 / 3, 2 / 3, 1],
                    color: ['#F4664A', '#FAAD14', '#30BF78'],
                },
                indicator: {
                    pointer: { style: { stroke: '#D0D0D0' } },
                    pin: { style: { stroke: '#D0D0D0' } },
                },
                statistic: {
                    content: {
                        style: {
                            fontSize: '25px',
                            lineHeight: '25px',
                        },
                    },
                },
            };
    
            setConfig(config)


        } else {

            finishRate = data.contract ? data.contract.finishRate : 0
            setFinishRate(Math.ceil(finishRate))

            contractGoal = data.contract ? data.contract.returnMoneyGoal : 0
            setContractGoal(contractGoal)

            returnMoneyTotal = data.contract ? data.contract.returnMoneyTotal : 0
            setReturnMoneyTotal(returnMoneyTotal)


            contractPrice = data.contract ? data.contract.contractPrice : 0
            setContractPrice(contractPrice)

            var config = {
                percent: finishRate/100,
                limitInPlot:true,
                type: 'meter',
                // innerRadius: 0.75,
                range: {
                    ticks: [0, 1 / 3, 2 / 3, 1],
                    color: ['#F4664A', '#FAAD14', '#30BF78'],
                },
                indicator: {
                    pointer: { style: { stroke: '#D0D0D0' } },
                    pin: { style: { stroke: '#D0D0D0' } },
                },
                statistic: {
                    content: {
                        style: {
                            fontSize: '25px',
                            lineHeight: '25px',
                        },
                    },
                },
            };
    
            setConfig(config)

        }
    }


    return (
        <div >
            <div style={{ padding: '10px 10px 0 0', width: '100%', textAlign: 'right' }} >
                <div style={{ zIndex: 999 }} >
                    <Select style={{ width: 100 }}
                        onChange={changeData}
                    >
                        <Option value='回款金额'>回款金额</Option>
                        <Option value='合同金额' >合同金额</Option>
                    </Select >
                </div>

            </div>


            <div id="echarts-main" style={{
                width: 300, height: 300,
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                margin: 'auto',
                zIndex: 1
                // border: '1px solid red'
            }}>
                <Gauge {...config} />;

            </div>

            <div style={{ position: 'absolute', display: 'flex', bottom: "0", flexDirection: 'row', justifyContent: 'space-between', padding: '0 0 10px 0' }} >
                <div style={{ display: 'inline-block', padding: "0 10px" }} >目标：{contractGoal}元</div>
                <div style={{ display: 'inline-block', padding: "0 10px" }}  >回款金额：{returnMoneyTotal}元</div>
                <div style={{ display: 'inline-block', padding: "0 10px" }} >合同金额：{contractPrice}元</div>
            </div>
        </div>
    );
}

export default EchartsTest



