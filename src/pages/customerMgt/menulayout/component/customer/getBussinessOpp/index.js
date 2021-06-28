import React, { Component } from 'react'
import base from '../../../../../../axios/axios';
import axios from 'axios';
import qs from 'qs'
import { Table } from 'antd'
import Data from '../js';
class GetBizOpp extends Component {


    componentDidMount() {
        this.getThisCilentBizOpp()
    }


    constructor(props) {
        super(props)
        this.state = {
            token: window.localStorage.getItem("token"),
            tableArr: ''
        }

        this.getThisCilentBizOpp = this.getThisCilentBizOpp.bind(this)
    }


    getThisCilentBizOpp() {
        axios({
            method: 'get',
            url: `${base.url}/client/getCommercialOpportunity`,
            params: {
                token: this.state.token,
                clientId: this.props.value
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
                {this.state.tableArr? (
                    <Table
                        columns={Data.columnsBizOpp}
                        dataSource={this.state.tableArr}
                        style={{ minHeight: '50vh' }}

                    />
                )
                    :
                    '暂无'
                }


            </div>
        )
    }

}

export default GetBizOpp