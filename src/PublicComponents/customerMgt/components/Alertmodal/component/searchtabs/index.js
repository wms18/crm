import { Tabs } from 'antd';
import React from 'react'
import "./style.css"
import Seatchtransfer from '../searchtransfer'

const { TabPane } = Tabs;

function Searchtabs() {
    function callback(key) {
        console.log(key);
    }

    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="员工" key="1">
                    <div>
                    <Seatchtransfer></Seatchtransfer>
                    </div>
                   
           </TabPane>
                <TabPane tab="部门" key="2">
                    <div>
                         <Seatchtransfer></Seatchtransfer>
                    </div>
                    
            </TabPane>
            </Tabs>
        </div>
    )
}

export default Searchtabs;

