import React from 'react';
import { Popover, Button } from 'antd';
import './style.css';


const  content = (
  <div className='popovercontent'>
    <div>
      <span>线索</span>
    &nbsp;&nbsp;
    <span>客户</span>
    </div>
    <div>
      <span>联系人</span>
    &nbsp;&nbsp;
    <span>商机</span>
    </div>
    <div>
      <span>合同</span>
    &nbsp;&nbsp;
    <span>回款</span>
    </div>
    <div>
      <span>产品</span>
    &nbsp;&nbsp;
    </div>
  </div>
)
function Creatpopover() {
  return (
    <div className='creatpopover'  >
      <Popover placement="rightTop" content={content} trigger="hover">
        <Button>快速创建</Button>
      </Popover>
    </div>
  )
}

export default Creatpopover;
