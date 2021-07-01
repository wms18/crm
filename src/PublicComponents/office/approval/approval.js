import './approval.css'
import {Button, Select, DatePicker, Space, ConfigProvider} from 'antd';
import React, {useState} from "react";
import zhCN from "antd/lib/locale/zh_CN";

function Approval() {
    let arr = ['我发起的', '我审批的']
    let [approveIndex, setApproveIndex] = useState(0)    //arr
    //日期选择框
    const {RangePicker} = DatePicker;
    let onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    let onOk = (value) => {
        console.log('onOk: ', value);
    }
    //审批类型
    const {Option} = Select;
    let handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    return (
        <div className={'approval'}>
            <div className={'approvalTop'}>
                <div>
                    {arr.map((item, index) => {
                        return (
                            <span key={index}
                                  className={index === approveIndex ? 'approvalActive approveSp' : 'approveSp'}
                                  onClick={() => {
                                      setApproveIndex(index)
                                  }}
                            >{item}</span>
                        )
                    })}
                </div>
                <div>
                    <span>审批类型</span>
                    <Select defaultValue="全部" style={{width: 120, margin: '0 20px'}} allowClear>
                        <Option value="0">全部</Option>
                        <Option value="1">请假审批</Option>
                        <Option value="2">差旅报销</Option>
                        <Option value="3">借款申请</Option>
                        <Option value="4">出差申请</Option>
                    </Select>
                    <Button type={"primary"}> 新建审批</Button>
                </div>
            </div>
            <div style={{margin: '20px 0'}}>
                <span>审核状态</span>
                <Select defaultValue="全部" style={{width: 120, margin: '0 20px'}}  onChange={handleChange} allowClear>
                    <Option value="0">全部</Option>
                    <Option value="1">未审核</Option>
                    <Option value="2">通过</Option>
                    <Option value="3">拒绝</Option>
                    <Option value="4">已撤回</Option>
                </Select>
                <span style={{marginRight: '10px'}}>发起时间</span>
                <Space direction="vertical" size={12}>
                    <ConfigProvider locale={zhCN}>
                        <RangePicker
                            showTime={{format: 'HH:mm'}}
                            format="YYYY-MM-DD HH:mm"
                            onChange={onChange}
                            onOk={onOk}
                        />
                    </ConfigProvider>
                </Space>
            </div>
        </div>
    )
}

export default Approval
