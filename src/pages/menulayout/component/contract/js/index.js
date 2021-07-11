const Data = {

  columns: [
    {
      width: 150,
      title: '合同编号',
      dataIndex: 'contractCoding',
      key: 'contractCoding',
      fixed: 'left',
      sorter: {
        compare: (a, b) => a.contractCoding - b.contractCoding,
        multiple: 3,
        key: ''
      },
    },
    {
      title: '合同名称',
      width: 150,
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
      width: 200,
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
        compare: (a, b) => a.contractPrice - b.contractPrice,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '折扣',
      dataIndex: 'discount',
      key: 'discount',
      sorter: {
        compare: (a, b) => a.discount - b.discount,
        multiple: 3,
      },
    },
    {
      width: 200,
      title: '合同开始时间',
      dataIndex: 'contractBeginTime',
      key: 'contractBeginTime',
      sorter: {
        compare: (a, b) => a.contractBeginTime - b.contractBeginTime,
        multiple: 3,
      },
    },
    {
      width: 200,
      title: '合同结束时间',
      dataIndex: 'contractEndTime',
      key: 'contractEndTime',
      sorter: {
        compare: (a, b) => a.contractEndTime - b.contractEndTime,
        multiple: 3,
      },
    },
    {
      width: 150,
      title: '客户签约人',
      dataIndex: 'clientSignName',
      key: '5',
      sorter: {
        compare: (a, b) => a.clientSignName.charCodeAt(0) - b.clientSignName.charCodeAt(0),
        multiple: 3,
      },
    },
    {
      width: 150,
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
      width: 200,
      title: '更新时间',
      dataIndex: 'updateTime',
      key: '8',
      sorter: {
        compare: (a, b) => a.updateTime - b.updateTime,
        multiple: 3,
      },
    },
    {
      width: 200,
      title: '创建时间',
      dataIndex: 'createTime',
      key: '9',
      sorter: {
        compare: (a, b) => a.createTime - b.createTime,
        multiple: 3,
      },
    },


  ],

  columnsGetProduct: [
    {
      width: 100,
      title: '产品名称',
      dataIndex: 'produceName',
      key: 'produceName',

    },
    {
      title: '产品类别',
      width: 100,
      dataIndex: 'produceType',
      key: '1',
    },
    {
      width: 100,
      title: '产品规格',
      dataIndex: 'specification',
      key: '2',
    },
    {
      width: 100,
      title: '价格',
      dataIndex: 'price',
      key: '3',
    },
    {
      width: 100,
      title: '数量',
      dataIndex: 'number',
      key: '4',
    },
  ],
  columnsGetPayment: [
    {
      width: 100,
      title: '回款编号',
      dataIndex: 'returnNumber',
      key: 'produceName',
      fixed:'left',
      sorter: {
        compare: (a, b) => a.returnNumber - b.returnNumber,
        multiple: 3,
        key: ''
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
      title: '负责人',
      dataIndex: 'employeeResponsibleName',
      key: '11',
      sorter: {
        compare: (a, b) => a.employeeResponsibleName.charCodeAt(0) - b.employeeResponsibleName.charCodeAt(0),
        multiple: 3,
      },
    },
   
  ],
}

export default Data