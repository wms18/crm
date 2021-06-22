import React from 'react';
import 'antd/dist/antd.css';
import { Tooltip } from 'antd';
import Creat from "./creat";
import './right.css'
const text = <span><Creat/></span>;

function Right() {
    return(
        <div className="demo ">
            <div className={'right_demo'}>
                <Tooltip placement="right" title={text} >
                    <span className={'right_fast'}>快速创建
                    <span className={'right_sp'}> > </span>
                    </span>
                </Tooltip>
            </div>
        </div>
    )
}
export default Right
