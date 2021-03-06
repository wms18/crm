import React from 'react';
import { Popover, Button } from 'antd';
import './style.css';
import { useState } from 'react';
import CreateContract from '../createContract'
import CreateClue from '../createClue';
import CreateCustomer from '../createCustomer';
import CreateContacts from '../createContacts';
import CreateBizOpp from '../createBizOpp';
import CreatePayment from '../createPayment';
import PopCreateProduct from '../popCreateProduct'
function Creatpopover() {

  let [showcreateContract, setShowcreateContract] = useState(false)
  let [showcreateClue, setshowcreateClue] = useState(false)
  let [showcreateCustomer, setShowcreateCustomer] = useState(false)
  let [showcreateContacts, setShowcreateContacts] = useState(false)
  let [showcreateBizOpp, setShowcreateBizOpp] = useState(false)
  let [showcreatePayment, setShowcreatePayment] = useState(false)
  let [showcreateProduct, setShowcreateProduct] = useState(false)


  function hidden() {
    setShowcreateContract(false)
    setshowcreateClue(false)
    setShowcreateCustomer(false)
    setShowcreateContacts(false)
    setShowcreateBizOpp(false)
    setShowcreatePayment(false)
    setShowcreateProduct(false)
  }

  let content = (
    <div className='popovercontent' >
      <div>
        <span
          onClick={() => {
            setshowcreateClue(true)
          }}
        >线索</span>
        &nbsp;&nbsp;
        <span
          onClick={() => {
            setShowcreateCustomer(true)
          }}
        >客户</span>
      </div>
      <div>
        <span
          onClick={() => {
            setShowcreateContacts(true)
          }}
        >联系人</span>
        &nbsp;&nbsp;
        <span
          onClick={() => {
            setShowcreateBizOpp(true)
          }}
        >商机</span>
      </div>
      <div>
        <span
          onClick={() => {
            setShowcreateContract(true)
          }}
        >合同</span>
        &nbsp;&nbsp;
        <span
          onClick={() => {
            setShowcreatePayment(true)
          }}
        >回款</span>
      </div>
      <div>
        <span
        onClick={()=>{
          setShowcreateProduct(true)
        }}
        >产品</span>
        &nbsp;&nbsp;
      </div>


    </div>
  )

  return (
    <div className='creatpopover'  >
      <Popover placement="rightTop" content={content} trigger="hover">
        <Button>快速创建</Button>
      </Popover>

      <CreateContract show={showcreateContract} method={hidden}  ></CreateContract>
      <CreateClue show={showcreateClue} method={hidden}  ></CreateClue>
      <CreateCustomer show={showcreateCustomer} method={hidden}  ></CreateCustomer>
      <CreateContacts show={showcreateContacts} method={hidden}  ></CreateContacts>
      <CreateBizOpp show={showcreateBizOpp} method={hidden}  ></CreateBizOpp>
      <CreatePayment show={showcreatePayment} method={hidden}  ></CreatePayment>
      <PopCreateProduct show={showcreateProduct} method={hidden}   ></PopCreateProduct>

    </div>

  )
}

export default Creatpopover;
