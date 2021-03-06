const Data = {
  columns: [
    {
      width: 100,
      title: '客户姓名',
      dataIndex: 'clientName',
      key: 'clientName',
      fixed: 'left',
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