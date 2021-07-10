import React, { useEffect, useState, Tag } from 'react'
import {
  UserAddOutlined
}
  from '@ant-design/icons'
import "./style.css"
import { Drawer, Button, Input, Table } from 'antd';
import columns from './js/index'

import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2607566_a8bvf81fzlt.js', // icon-home  icon-gouwucheman
  ],
});

const { Search } = Input



function FollowUp(props) {

  let [visible, setVisible] = useState(false)
  let [followvisible, setFollowvisible] = useState(false)
  let [dataArr, setDataArr] = useState([])

  let [tableArr, setTableArr] = useState([])
  let [recordArr, setRecordArr] = useState([])
  let [customer, setCustomer] = useState([])
  let [clue, setClue] = useState([])
  let [bizOpp, setBizOpp] = useState([])
  let [contract, setContract] = useState([])
  let [contacts, setContacts] = useState([])
  let [openSea, setOpenSea] = useState([])

  useEffect(() => {
    console.log('跟进记录：', props.data);
    if (props.data.data) {

      let arr = {
        customer: {
          count: props.data.data.clientFollowRecord ? props.data.data.clientFollowRecord.length : 0,
          data: props.data.data.clientFollowRecord ? props.data.data.clientFollowRecord : []
        },
        clue: {
          count: props.data.dataclueFollowRecord ? props.data.data.clueFollowRecord.length : 0,
          data: props.data.dataclueFollowRecord ? props.data.data.clueFollowRecord : []
        },
        bizOpp: {
          count: props.data.data.commercialOpportunityFollowRecord ? props.data.data.commercialOpportunityFollowRecord.length : 0,
          data: props.data.data.commercialOpportunityFollowRecord ? props.data.data.commercialOpportunityFollowRecord : []
        },
        contract: {
          count: props.data.data.contractFollowRecord ? props.data.data.contractFollowRecord.length : 0,
          data: props.data.data.contractFollowRecord ? props.data.data.contractFollowRecord : []
        },
        contacts: {
          count: props.data.data.linkmanFollowRecord ? props.data.data.linkmanFollowRecord.length : 0,
          data: props.data.data.linkmanFollowRecord ? props.data.data.linkmanFollowRecord : []
        },
        openSea: {
          count: props.data.dataopenseaFollowRecord ? props.data.dataopenseaFollowRecord.length : 0,
          data: props.data.dataopenseaFollowRecord ? props.data.dataopenseaFollowRecord : []
        }
      }
      dataArr = { ...arr }
      setDataArr(dataArr)


      let newAray = []
      dataArr.customer.data.map((item) => {
        newAray.push({
          employeeName: item.employeeName,
          employeeAvatar: item.employeeAvatar,
          followRecord: item.followRecord,
          recordType: item.recordType,
          nextTime: item.nextTime
        })
        return newAray
      })
      recordArr = newAray
      setRecordArr(recordArr)
      console.log(recordArr);

      let newArr = []
      newArr.push(
        {
          type: '线索',
          count: props.data.dataclueFollowRecord ? props.data.data.clueFollowRecord.length : 0,
        },
        {
          type: '客户',
          count: props.data.data.clientFollowRecord ? props.data.data.clientFollowRecord.length : 0,
        },
        {
          type: '联系人',
          count: props.data.data.linkmanFollowRecord ? props.data.data.linkmanFollowRecord.length : 0,
        },
        {
          type: '商机',
          count: props.data.data.commercialOpportunityFollowRecord ? props.data.data.commercialOpportunityFollowRecord.length : 0,
        },
        {
          type: '合同',
          count: props.data.data.contractFollowRecord ? props.data.data.contractFollowRecord.length : 0,
        },
        {
          type: '公海',
          count: props.data.dataopenseaFollowRecord ? props.data.dataopenseaFollowRecord.length : 0,
        }
      )

      tableArr = newArr
      setTableArr(tableArr)
    }

  }, [props.data])

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  function closeDetail() {
    setFollowvisible(false)

  }

  return (


    <div className="site-drawer-render-in-current-wrapper">
      <div
        style={{
          marginTop: 16,
        }}
      >

        <div
          style={{
            padding: 8,
            width: 180,
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f2f2f5',
            borderRadius: 3
          }}
          onClick={showDrawer}
        >
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <span className='iconfont icon-genjin' style={{ color: '#F47D71', fontSize: '18px', marginRight: "5px" }} ></span>
            <span style={{ fontSize: 12 }}>新增跟进记录</span>
          </div>
          <div>
            <span style={{ fontSize: 12 }}>{props.data.qty ? props.data.qty : 0}</span>
          </div>
        </div>
        {/* 
        <Button type="primary" icon={<IconFont type='icon-kehu1' />} onClick={showDrawer} style={{ width: 180 }}>
          客戶&nbsp;&nbsp;
        </Button> */}
      </div>
      <Drawer
        title="销售简报-新增跟进记录"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={'100vw'}
        getContainer={false}
        closable={true}
        destroyOnClose={true}
        bodyStyle={{ padding: '0 30px 30px' }}
      >


        <div>
          <div>
            <Table columns={columns} dataSource={tableArr}

              onRow={(record) => ({
                onClick: () => {
                  console.log(111);
                  // followvisible = true
                  // setFollowvisible(followvisible)
                  // if (record.type == '客户') {
                  //   let newAray = []
                  //   // recordArr = tableArr.customer.data
                  //   if (dataArr.customer.data) {
                  //     dataArr.customer.data.map((item) => {
                  //       newAray.push({
                  //         employeeName: item.employeeName,
                  //         employeeAvatar: item.employeeAvatar,
                  //         followRecord: item.followRecord,
                  //         recordType: item.recordType,
                  //         nextTime: item.nextTime
                  //       })
                  //       return newAray
                  //     })
                  //     record = newAray
                  //     setRecordArr(record)
                  //     console.log(record);
                  //     setFollowvisible(true)
                  //   }
                  // }


                },
              })}

            />
          </div>
          <Drawer
            title="跟进记录"
            placement="right"
            // closable={false}
            onClose={closeDetail}
            visible={followvisible}
            width={'100vw'}
          >


            <div>


              <div style={{ margin: '30px 0', width: '80vw', height: '40vw', border: '1px solid' }} >
                打算打打
                {
                  recordArr ? recordArr.map((item, index) => {
                    <div key={index} style={{ margin: '30px 0', width: '80vw', height: '40vw', border: '1px solid' }}>
                      <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}>
                          <div
                            style={{
                              width: '34px',
                              height: '34px',
                              backgroundColor: 'blue',
                              borderRadius: '50%',
                              color: 'white',
                              textAlign: 'center',
                              lineHeight: '34px',
                              marginRight: '8px'
                            }}
                          >
                            {item.employeeAvatar ?
                              // <img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fc8%2Fdd%2Fb9%2Fc8ddb934a69d90216f1b406cf3975475.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627462261&t=4e52d02794c760fb28e678c680fa467e'  />
                              <span>{item.employeeName.slice(0, 2)}</span>
                              :
                              <span>{item.employeeName.slice(0, 2)}</span>
                            }
                          </div>
                          <div>


                            <div style={{ fontSize: '13px' }}>{item.employeeName}</div>
                            <div style={{ color: 'rgb(153, 153, 153)', marginTop: '3px', fontSize: '12px' }} >{item.createTime}</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '20px 0px 0px 40px' }}>
                        {item.followRecord}
                      </div>
                      <div style={{ padding: '20px 0px 0px 40px' }}>
                        {item.recordType ? <Tag>{item.recordType}</Tag> : ''}
                        {item.nextTime ? <Tag>{item.nextTime}</Tag> : ''}
                      </div>
                    </div>
                  })
                    :
                    <div>世纪大厦</div>
                }
              </div>
            </div>

          </Drawer>
        </div>



      </Drawer>


    </div>
  );
}

export default FollowUp