import React from 'react'
import './style.css'
import { Table } from 'antd'
import { useEffect } from 'react';
import GetProductTable from '../getProductTable';
import { useState } from 'react';
import Data from './js';


function AddedProduct(props) {


    let [productArr, setProductArr] = useState([])


    useEffect(() => {
        // console.log(props.methods);
        // tableData()
        // tableData()
        // console.log(props.productInfo);
        // productArr = props.productInfo
        // setProductArr(productArr)
    }, [productArr])


    // let methods=props.methods

    function tableData(val) {
        console.log(val);
        productArr = val
        setProductArr(productArr)
        console.log(productArr);
    }
    return (
        <div style={{ width: '460px' }}>
            <GetProductTable getProduct={(val) => {
               props.methods(val)
               tableData(val)
            }}   ></GetProductTable>
            <div>


                <div>

                </div>
                <div >

                    {
                        productArr.length > 0 ?

                            <Table
                                columns={Data.columns}
                                dataSource={productArr}
                            ></Table>

                            :
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E6E5E6', padding: '20px' }}>
                                    <span>产品名称</span>
                                    <span>产品类别</span>
                                    <span>售价</span>
                                </div>
                                < div style={{ height: '60px', textAlign: 'center', lineHeight: '60px', backgroundColor: '#F5F7FA' }}>
                                    暂无数据
                                </div>
                            </div>
                    }
                </div>


            </div>
        </div >
    )
}

export default AddedProduct