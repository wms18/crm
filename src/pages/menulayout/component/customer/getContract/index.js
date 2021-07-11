import React, { Component } from 'react'
import base from '../../../../../axios/axios';
import axios from 'axios';
import qs from 'qs'
import { Table } from 'antd'
import Data from '../js';
class GetContract extends Component {


    componentDidMount() {
        this.getThisCilentContract()
    }


    constructor(props) {
        super(props)
        this.state = {
            token: window.localStorage.getItem("token"),
            tableArr: ''
        }

        this.getThisCilentContract = this.getThisCilentContract.bind(this)
    }


    getThisCilentContract() {
        axios({
            method: 'get',
            url: `${base.url}/client/getContract`,
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
                <Table
                    columns={Data.columnsGetContract}
                    dataSource={this.state.tableArr}
                    style={{ minHeight: '50vh' }}
                    scroll={{ x: 1500 }}


                />

            </div>
        )
    }

}

export default GetContract