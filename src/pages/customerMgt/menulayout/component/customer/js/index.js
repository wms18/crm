const Data = {
  columns: [
    {
      width: 100,
      title: '客户名称',
      dataIndex: 'clientName',
      key: 'clientName',
      fixed:'left',
      sorter: {
        compare: (a, b) => a.clientName - b.clientName,
        multiple: 3,
        key: ''
      },
    },
    {
      title: '手机号',
      width: 200,
      dataIndex: 'phone',
      key: '1',
      sorter: {
        compare: (a, b) => a.phone - b.phone,
        multiple: 3,
      },
    },
    {
      width: 200,
      title: '客户证件号',
      dataIndex: 'certificateId',
      key: '2',
      sorter: {
        compare: (a, b) => a.certificateId - b.certificateId,
        multiple: 3,
      },
    },
    {
      width: 150,
      title: '客户来源',
      dataIndex: 'clientFrom',
      key: '3',
      sorter: {
        compare: (a, b) => a.clientFrom - b.clientFrom,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '客户等级',
      dataIndex: 'clientLevel',
      key: '4',
      sorter: {
        compare: (a, b) => a.clientLevel - b.clientLevel,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '备注',
      dataIndex: 'content',
      key: '5',
      sorter: {
        compare: (a, b) => a.content - b.content,
        multiple: 3,
      },
    },
    {
      width: 250,
      title: '详细地址',
      dataIndex: 'detailAddress',
      key: '6',
      sorter: {
        compare: (a, b) => a.detailAddress - b.detailAddress,
        multiple: 3,
      },
    },
    {
      width: 200,
      title: '钉钉',
      dataIndex: 'dingtalk',
      key: '7',
      sorter: {
        compare: (a, b) => a.dingtalk - b.dingtalk,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '创建人ID',
      dataIndex: 'employeeCreateId',
      key: '8',
      sorter: {
        compare: (a, b) => a.employeeCreateId - b.employeeCreateId,
        multiple: 3,
      },
    },
    {
      width: 200,
      title: '下次联系时间',
      dataIndex: 'nextTalkTime',
      key: '9',
      sorter: {
        compare: (a, b) => a.personInCharge - b.personInCharge,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '负责人ID',
      dataIndex: 'employeeResponsibleId',
      key: 'employeeResponsibleId',
      fixed: 'right',
      sorter: {
        compare: (a, b) => a.employeeResponsibleId - b.employeeResponsibleId,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '距进入公海时间',
      dataIndex: 'intoSeaTime',
      key: 'intoSeaTime',
      fixed: 'right',
      sorter: {
        compare: (a, b) => a.intoSeaTime - b.intoSeaTime,
        multiple: 3,
      },
    },
  ],
  columnsBizOpp: [
    {
      title: '商机名称',
      dataIndex: 'name',
      key: '1',
      sorter: {
        compare: (a, b) => a.name.charCodeAT(0) - b.name.charCodeAT(0),
        multiple: 3,
      }
    },
    {
      title: '商机金额',
      dataIndex: 'totalPrice',
      key: '2',
      sorter: {
        compare: (a, b) => a.totalPrice - b.totalPrice,
        multiple: 3,
      },
    },
    {
      title: '客户名称',
      dataIndex: 'clientName',
      key: '3',
      sorter: {
        compare: (a, b) => a.clientName.charCodeAT(0) - b.clientName.charCodeAT(0),
        multiple: 3,
      },
    },
    {
      title: '商机状态组',
      dataIndex: 'commercialStatusGroup',
      key: '4',
      sorter: {
        compare: (a, b) => a.commercialStatusGroup.charCodeAT(0) - b.commercialStatusGroup.charCodeAT(0),
        multiple: 3,
      },

    },
    {
      title: '商机状态',
      dataIndex: 'commercialStage',
      key: '5',
      sorter: {
        compare: (a, b) => a.commercialStage.charCodeAT(0) - b.commercialStage.charCodeAT(0),
        multiple: 3,
      },

    },
  ]
  ,
  columnsGetPayment: [
    {
      width: 100,
      title: '回款编号',
      dataIndex: 'returnNumber',
      key: 'produceName',
      sorter: {
        compare: (a, b) => a.returnNumber - b.returnNumber,
        multiple: 3,
        key: ''
      },
    },
    {
      title: '客户名称',
      width: 100,
      dataIndex: 'clientName',
      key: '1',
      sorter: {
        compare: (a, b) => a.clientName - b.clientName,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '产品编码',
      dataIndex: 'produceCoding',
      key: '2',
      sorter: {
        compare: (a, b) => a.produceCoding - b.produceCoding,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '合同编号',
      dataIndex: 'contractCoding',
      key: '3',
      sorter: {
        compare: (a, b) => a.contractCoding - b.contractCoding,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '回款日期',
      dataIndex: 'receiveTime',
      key: '4',
      sorter: {
        compare: (a, b) => a.receiveTime - b.receiveTime,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '回款方式',
      dataIndex: 'receiveWay',
      key: '5',
      sorter: {
        compare: (a, b) => a.receiveWay - b.receiveWay,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '回款金额',
      dataIndex: 'receiveMoney',
      key: '6',
      sorter: {
        compare: (a, b) => a.number - b.number,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '期数',
      dataIndex: 'periods',
      key: '7',
      sorter: {
        compare: (a, b) => a.periods - b.periods,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '备注',
      dataIndex: 'content',
      key: '8',
      sorter: {
        compare: (a, b) => a.content - b.content,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '创建人',
      dataIndex: 'employeeCreateName',
      key: '9',
      sorter: {
        compare: (a, b) => a.employeeCreateName - b.employeeCreateName,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '更新时间',
      dataIndex: 'updateTime',
      key: '10',
      sorter: {
        compare: (a, b) => a.personInCharge - b.personInCharge,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '创建时间',
      dataIndex: 'createTime',
      key: '11',
      sorter: {
        compare: (a, b) => a.createTime - b.createTime,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '负责人',
      dataIndex: 'employeeResponsibleName',
      key: '11',
      sorter: {
        compare: (a, b) => a.employeeResponsibleName.charCodeAt(0) - b.employeeResponsibleName.charCodeAt(0),
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '合同金额',
      dataIndex: 'contractTotal',
      key: 'contractTotal',
      fixed: 'right',
      sorter: {
        compare: (a, b) => a.contractTotal - b.contractTotal,
        multiple: 3,
      },
    },
  ],
  
  columnsGetContract: [
    {
      width: 100,
      title: '合同编号',
      dataIndex: 'contractCoding',
      key: 'contractCoding',
      sorter: {
        compare: (a, b) => a.contractCoding - b.contractCoding,
        multiple: 3,
        key: ''
      },
    },
    {
      title: '合同名称',
      width: 100,
      dataIndex: 'contractName',
      key: '1',
      sorter: {
        compare: (a, b) => a.contractName.charCodeAt(0) - b.contractName.charCodeAt(0),
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '客户名称',
      dataIndex: 'clientName',
      key: '2',
      sorter: {
        compare: (a, b) => a.clientName.charCodeAt(0) - b.clientName.charCodeAt(0),
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '下单时间',
      dataIndex: 'orderTime',
      key: '3',
      sorter: {
        compare: (a, b) => a.orderTime - b.orderTime,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '合同金额',
      dataIndex: 'contractPrice',
      key: '4',
      sorter: {
        compare: (a, b) => a.contractPrice - b.contractPrice  ,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '折扣',
      dataIndex: 'discount',
      key: 'discount',
      sorter: {
        compare: (a, b) => a.discount - b.discount  ,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '合同开始时间',
      dataIndex: 'contractBeginTime',
      key: 'contractBeginTime',
      sorter: {
        compare: (a, b) => a.contractBeginTime - b.contractBeginTime  ,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '合同结束时间',
      dataIndex: 'contractEndTime',
      key: 'contractEndTime',
      sorter: {
        compare: (a, b) => a.contractEndTime - b.contractEndTime  ,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '客户签约人',
      dataIndex: 'clientSignName',
      key: '5',
      sorter: {
        compare: (a, b) => a.clientSignName.charCodeAt(0) - b.clientSignName.charCodeAt(0),
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '公司签约人',
      dataIndex: 'employeeSignName',
      key: 'employeeSignName',
      sorter: {
        compare: (a, b) => a.employeeSignName.charCodeAt(0) - b.employeeSignName.charCodeAt(0),
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '备注',
      dataIndex: 'content',
      key: '6',
      sorter: {
        compare: (a, b) => a.content.charCodeAt(0) - b.content.charCodeAt(0),
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '货币',
      dataIndex: 'currency',
      key: '7',
    },
    {
      width: 100,
      title: '创建人',
      dataIndex: 'employeeCreatName',
      key: 'employeeCreatName',
    },
    {
      width: 100,
      title: '更新时间',
      dataIndex: 'updateTime',
      key: '8',
      sorter: {
        compare: (a, b) => a.updateTime - b.updateTime,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '创建时间',
      dataIndex: 'createTime',
      key: '9',
      sorter: {
        compare: (a, b) => a.createTime - b.createTime,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '负责人',
      dataIndex: 'employeeResponsibleName',
      key: 'employeeResponsibleName',
      sorter: {
        compare: (a, b) => a.employeeResponsibleName.charCodeAt(0) - b.employeeResponsibleName.charCodeAt(0),
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '已回款',
      dataIndex: 'receivePrice',
      key: 'receivePrice',
      fixed: 'right',
      sorter: {
        compare: (a, b) => a.receivePrice - b.receivePrice,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '未回款',
      dataIndex: 'unReceivePrice',
      key: 'unReceivePrice',
      fixed: 'right',
      sorter: {
        compare: (a, b) => a.unReceivePrice - b.unReceivePrice,
        multiple: 3,
      },
    },
  ]

}

export default Data