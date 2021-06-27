import { Input, Space } from 'antd';
import React, {useState} from "react";
import './mail.css'
function Mail() {
    //搜索
    const { Search } = Input;
    const onSearch = value => console.log(value);
    let arr = ['员工','部门']
    let [mailIndex,setMailIndex] = useState(0)
    return(
        <div className={'mail'} style={{width:'800px',margin:'20px'}}>
            <div className={'mailTop'}>
                {arr.map((item,index)=>{
                    return(
                        <span className={index === mailIndex?'mailActive mailSp':'mailSp'}
                              onClick={()=>{
                                  setMailIndex(index)
                              }}
                              key={index}>{item}</span>
                    )
                })}
            </div>
            <div style={{margin:'20px 0'}}>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 200 }} />
            </div>
            <div className={'mailList'}>
                123
            </div>
        </div>
    )
}
export default Mail
