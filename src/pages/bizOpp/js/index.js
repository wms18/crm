const Data = {
  columns: [
    {
      width: 150,
      title: '商机名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      sorter: {
        compare: (a, b) => a.name.charCodeAt(1) - b.name.charCodeAt(1),
        multiple: 3,
        key: ''
      },
    },
    {
      width: 100,
      title: '客户名称',
      dataIndex: 'clientName',
      key: '0',
      // fixed: 'left',
      sorter: {
        compare: (a, b) => a.name.charCodeAt(1) - b.name.charCodeAt(1),
        multiple: 3,
        key: ''
      },
    },
    {
      title: '商机状态组',
      width: 150,
      dataIndex: 'commercialStatusGroup',
      key: '1',
      sorter: {
        compare: (a, b) => a.commercialStatusGroup.charCodeAt(1) - b.commercialStatusGroup.charCodeAt(1),
        multiple: 3,
      },
    },
    {
      width: 150,
      title: '商机阶段',
      dataIndex: 'commercialStage',
      key: '2',
      sorter: {
        compare: (a, b) => a.commercialStage - b.commercialStage,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '商机金额',
      dataIndex: 'totalPrice',
      key: '3',
      sorter: {
        compare: (a, b) => a.totalPrice - b.totalPrice,
        multiple: 3,
      },
    },
    {
      width: 150,
      title: '预计成交时间',
      dataIndex: 'submissionTime',
      key: '4',
      sorter: {
        compare: (a, b) => a.submissionTime - b.submissionTime,
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
      width: 100,
      title: '创建人',
      dataIndex: 'employeeCreate',
      key: '6',
      sorter: {
        compare: (a, b) => a.employeeCreate - b.employeeCreate,
        multiple: 3,
      },
    },
    {
      width: 150,
      title: '更新时间',
      dataIndex: 'updatetime',
      key: '8',
      sorter: {
        compare: (a, b) => a.updateTime - b.updateTime,
        multiple: 3,
      },
    },
    {
      width: 150,
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
      dataIndex: 'employeeResponsible',
      key: 'employeeResponsible',
      fixed: 'right',
      sorter: {
        compare: (a, b) => a.employeeResponsible - b.employeeResponsible,
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

}

export default Data
