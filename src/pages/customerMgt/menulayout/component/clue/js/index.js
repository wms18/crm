const  Data={
    columns : [
        {
          width: 100,
          title: '客户姓名',
          dataIndex: 'clientName',
          key:'clientName',
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
          key:'1',
          sorter: {
            compare: (a, b) => a.mobile - b.mobile,
            multiple: 3,
          },
        },
        {
          width: 150,
          title: '电话',
          dataIndex: 'phone',
          key:'2',
          sorter: {
            compare: (a, b) => a.phone - b.phone,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '线索来源',
          dataIndex: 'clueFrom',
          key:'4',
          sorter: {
            compare: (a, b) => a.clueFrom - b.clueFrom,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '客户类型',
          dataIndex: 'clientType',
          key:'5',
          sorter: {
            compare: (a, b) => a.clientType - b.clientType,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '客户等级',
          dataIndex: 'clientLevel',
          key:'6',
          sorter: {
            compare: (a, b) => a.clientLevel - b.clientLevel,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '备注',
          dataIndex: 'content',
          key:'7',
          sorter: {
            compare: (a, b) => a.content - b.content,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '部门ID',
          dataIndex: 'departmentId',
          key:'7',
          sorter: {
            compare: (a, b) => a.departmentId - b.departmentId,
            multiple: 3,
          },
        },
        {
          width: 200,
          title: '下次联系时间',
          dataIndex: 'nextTalkTime',
          key:'7',
          sorter: {
            compare: (a, b) => a.nextTalkTime - b.nextTalkTime,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '公司',
          dataIndex: 'company',
          key:'8',
          sorter: {
            compare: (a, b) => a.company - b.company,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '创建人ID',
          dataIndex: 'employeeCreateId',
          key:'9',
          sorter: {
            compare: (a, b) => a.employeeCreateId - b.employeeCreateId,
            multiple: 3,
          },
        },
        {
          width: 200,
          title: '更新时间',
          dataIndex: 'updateTime',
          key:'9',
          sorter: {
            compare: (a, b) => a.updateTime - b.updateTime,
            multiple: 3,
          },
        },
        {
          width: 200,
          title: '创建时间',
          dataIndex: 'createTime',
          key:'9',
          sorter: {
            compare: (a, b) => a.createTime - b.createTime,
            multiple: 3,
          },
        },
        {
          width: 200,
          title: '跟进记录',
          dataIndex: 'record',
          key:'record',
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
          key:'employeeResponsibleId',
          fixed:'right',
          sorter: {
            compare: (a, b) => a.employeeResponsibleId - b.employeeResponsibleId,
            multiple: 3,
          },
        },
      ],
    
      options : [
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