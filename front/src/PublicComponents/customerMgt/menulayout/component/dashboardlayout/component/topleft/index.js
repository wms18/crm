import React from 'react'
import "./style.css"
import Customer from './component/customer'

function Topleft() {
    return (
        <div className='topleft'>
            <div  >
                <i className='iconfont icon-xiaoshou'>销售简报</i>
            </div>
            <div className='button'>

                <div>
                    <Customer></Customer>
                </div>

                <div>
                  
                </div>
                <div>
                 
                </div>

            </div>
        </div>

    )
}

export default Topleft