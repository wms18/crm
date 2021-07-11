const Data = {
  columns: [
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
}

export default Data