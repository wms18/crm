import React, { Component } from 'react'
import base from '../../../../../axios/axios';
import axios from 'axios';
import qs from 'qs'
import { Table, ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';

import Data from '../js/index';
class GetProduct extends Component {


    componentDidMount() {
        this.getThisCilentPayment()
    }


    constructor(props) {
        super(props)
        this.state = {
            token: window.localStorage.getItem("token"),
            tableArr: ''
        }

        this.getThisCilentPayment = this.getThisCilentPayment.bind(this)
    }


    getThisCilentPayment() {
        axios({
            method: 'get',
            url: `${base.url}/contract/getLinkProduce`,
            params: {
                token: this.state.token,
                contractId: this.props.value
            }
        })
            .then((res) => {
                console.log(res);
                if (res.data.code === 'ERROR') {

                } else {
                    this.setState({
                        tableArr: res.data.data
                    })
                }
            })
            .catch((res) => {
                console.log(res);
            })
    }
    render() {
        return (
            <div>
                <ConfigProvider locale={zhCN} >
                    <Table
                        columns={Data.columnsGetProduct}
                        dataSource={this.state.tableArr}
                        style={{ minHeight: '50vh' }}

                    />
                </ConfigProvider>
            </div >
        )
    }

}

export default GetProduct