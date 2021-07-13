import React from 'react';
import 'antd/dist/antd.css';
import { Tooltip,Button } from 'antd';
import Creat from "./creat";
import './right.css'
const text = <span><Creat/></span>;

function Right() {
    return(
        <div >
            <div className={'creatpopover'}>
                <Tooltip placement="rightTop" title={text} zIndex={100}>
                    <Button >快速创建</Button>
                    {/*<span className={'right_sp'}> > </span>*/}
                </Tooltip>
            </div>
        </div>
    )
}
export default Right
