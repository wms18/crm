const Data = {
  columns: [
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
      fixed:'right',
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
      fixed:'right',
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
  ]
}

export default Data