const Data = {
  columnsGetCustomer: [
    {
      width: 100,
      title: '客户名称',
      dataIndex: 'clientName',
      key: 'clientName',
      sorter: {
        compare: (a, b) => a.clientName - b.clientName,
        multiple: 3,
        key: ''
      },
    },
    {
      title: '手机号',
      width: 100,
      dataIndex: 'phone',
      key: '1',
      sorter: {
        compare: (a, b) => a.phone - b.phone,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '客户证件号',
      dataIndex: 'certificateId',
      key: '2',
      sorter: {
        compare: (a, b) => a.certificateId - b.certificateId,
        multiple: 3,
      },
    },
    {
      width: 100,
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
      width: 100,
      title: '详细地址',
      dataIndex: 'detailAddress',
      key: '6',
      sorter: {
        compare: (a, b) => a.detailAddress - b.detailAddress,
        multiple: 3,
      },
    },
    {
      width: 100,
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
      width: 100,
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

  options: [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ],
  columnsClue: [
    {
      width: 100,
      title: '客户姓名',
      dataIndex: 'clientName',
      key: 'clientName',
      // fixed: 'left',
      sorter: {
        compare: (a, b) => a.clientName - b.clientName,
        multiple: 3,
      },
    },
    {
      title: '手机号',
      width: 150,
      dataIndex: 'mobile',
      key: '1',
      sorter: {
        compare: (a, b) => a.mobile - b.mobile,
        multiple: 3,
      },
    },
    {
      width: 150,
      title: '电话',
      dataIndex: 'phone',
      key: '2',
      sorter: {
        compare: (a, b) => a.phone - b.phone,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '线索来源',
      dataIndex: 'clueFrom',
      key: '4',
      sorter: {
        compare: (a, b) => a.clueFrom - b.clueFrom,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '客户类型',
      dataIndex: 'clientType',
      key: '5',
      sorter: {
        compare: (a, b) => a.clientType - b.clientType,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '客户等级',
      dataIndex: 'clientLevel',
      key: '6',
      sorter: {
        compare: (a, b) => a.clientLevel - b.clientLevel,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '备注',
      dataIndex: 'content',
      key: '7',
      sorter: {
        compare: (a, b) => a.content - b.content,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '部门ID',
      dataIndex: 'departmentId',
      key: '7',
      sorter: {
        compare: (a, b) => a.departmentId - b.departmentId,
        multiple: 3,
      },
    },
    {
      width: 200,
      title: '下次联系时间',
      dataIndex: 'nextTalkTime',
      key: '7',
      sorter: {
        compare: (a, b) => a.nextTalkTime - b.nextTalkTime,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '公司',
      dataIndex: 'company',
      key: '8',
      sorter: {
        compare: (a, b) => a.company - b.company,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '创建人ID',
      dataIndex: 'employeeCreateId',
      key: '9',
      sorter: {
        compare: (a, b) => a.employeeCreateId - b.employeeCreateId,
        multiple: 3,
      },
    },
    {
      width: 200,
      title: '更新时间',
      dataIndex: 'updateTime',
      key: '9',
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
    {
      width: 200,
      title: '跟进记录',
      dataIndex: 'record',
      key: 'record',
      // fixed:'right',
      sorter: {
        compare: (a, b) => a.record - b.record,
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
  ],
  columnsContract: [
    {
      width: 100,
      title: '产品名称',
      dataIndex: 'produceName',
      key: 'produceName',
      // fixed: 'left',
      sorter: {
        compare: (a, b) => a.produceName - b.produceName,
        multiple: 3,
        key: ''
      },
    },
    {
      title: '产品类别',
      width: 100,
      dataIndex: 'produceType',
      key: '1',
      sorter: {
        compare: (a, b) => a.produceType - b.produceType,
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
      title: '是否上架',
      dataIndex: 'putaway',
      key: '3',
      sorter: {
        compare: (a, b) => a.putaway - b.putaway,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '产品价格',
      dataIndex: 'price',
      key: '4',
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '产品描述',
      dataIndex: 'specification',
      key: '5',
      sorter: {
        compare: (a, b) => a.specification - b.specification,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '库存数量',
      dataIndex: 'number',
      key: '6',
      sorter: {
        compare: (a, b) => a.number - b.number,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '创建人',
      dataIndex: 'employeeCreate',
      key: '7',
      sorter: {
        compare: (a, b) => a.createPerson - b.createPerson,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '更新时间',
      dataIndex: 'updatetime',
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
      dataIndex: 'employeeResponsible',
      key: 'employeeResponsible',
      fixed: 'right',
      sorter: {
        compare: (a, b) => a.personInCharge - b.personInCharge,
        multiple: 3,
      },
    },
  ]
}

export default Data