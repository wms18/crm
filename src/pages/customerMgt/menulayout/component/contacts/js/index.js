const Data = {
  columns: [
    {
      width: 100,
      title: '联系人名称',
      dataIndex: 'linkmanName',
      key: 'linkmanName',
      sorter: {
        compare: (a, b) => a.linkmanName - b.linkmanName,
        multiple: 3,
        key: ''
      },
    },
    {
      title: '客户姓名',
      width: 100,
      dataIndex: 'clientName',
      key: '1',
      sorter: {
        compare: (a, b) => a.clientName.charCodeAt(1) - b.clientName.charCodeAt(1),
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '手机号',
      dataIndex: 'phone',
      key: '2',
      sorter: {
        compare: (a, b) => a.phone - b.phone,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '电话号',
      dataIndex: 'mobile',
      key: '3',
      sorter: {
        compare: (a, b) => a.mobile - b.mobile,
        multiple: 3,
      },
    },

    {
      width: 100,
      title: '电子邮箱',
      dataIndex: 'email',
      key: '4',
      sorter: {
        compare: (a, b) => a.email.charCodeAt(1) - b.email.charCodeAt(1),
        multiple: 3,
      },
    }, {
      width: 100,
      title: '是否決策人',
      dataIndex: 'decision',
      key: '5',
      sorter: {
        compare: (a, b) => a.decision - b.decision,
        multiple: 3,
      },
    },

    {
      width: 100,
      title: '职位',
      dataIndex: 'role',
      key: '6',
      sorter: {
        compare: (a, b) => a.role - b.role,
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
      title: '性别',
      dataIndex: 'sex',
      key: '8',
      sorter: {
        compare: (a, b) => a.sex - b.sex,
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
      title: '详细地址',
      dataIndex: 'detailAddress',
      key: '10',
      sorter: {
        compare: (a, b) => a.detailAddress - b.detailAddress,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '下次联系时间',
      dataIndex: 'nextTalkTime',
      key: '10',
      sorter: {
        compare: (a, b) => a.nextTalkTime - b.nextTalkTime,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '备注',
      dataIndex: 'content',
      key: '10',
      sorter: {
        compare: (a, b) => a.detailAddress - b.detailAddress,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '创建人姓名',
      dataIndex: 'employeeCreateName',
      key: '10',
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
        compare: (a, b) => a.updateTime - b.updateTime,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '负责人',
      dataIndex: 'employeeResponsibleName',
      key: '10',
      sorter: {
        compare: (a, b) => a.employeeResponsibleName - b.employeeResponsibleName,
        multiple: 3,
      },
    },
    {
      width: 100,
      title: '更新时间',
      dataIndex: 'updateTime',
      key: '10',
      sorter: {
        compare: (a, b) => a.updateTime - b.updateTime,
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