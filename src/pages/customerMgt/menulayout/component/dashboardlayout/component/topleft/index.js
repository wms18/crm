import React from 'react'
import "./style.css"
import Customer from './component/customer'

function Topleft() {
    return (
        <div style={{ marginRight: '20px' }} className='topleft'>
            <div  >
                <i className='iconfont icon-xiaoshou'>销售简报</i>
            </div>
            <div className='button'>

                <div>
                    <Customer></Customer>
                    <Customer></Customer>
                </div>
                <div>
                    <Customer></Customer>
                    <Customer></Customer>
                </div>
                <div>
                    <Customer></Customer>
                    <Customer></Customer>
                </div>
                <div>
                    <Customer></Customer>
                </div>

            </div>
        </div>

    )
}

export default Topleft