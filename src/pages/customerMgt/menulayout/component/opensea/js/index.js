const  Data={
    columns : [
        {
          width: 100,
          title: '成交状态',
          dataIndex: 'dealStatus',
          key:'dealStatus',
          // fixed: 'left',
          sorter: {
            compare: (a, b) => a.dealStatus.charCodeAt(0) - b.dealStatus.charCodeAt(0),
            multiple: 3,
            key:''
          },
        },
        {
          title: '客户名称',
          width: 100,
          dataIndex: 'clientName',
          key:'1',
          sorter: {
            compare: (a, b) => a.clientName.charCodeAt(0) - b.clientName.charCodeAt(0),
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '证件类型',
          dataIndex: 'certificate',
          key:'2',
          sorter: {
            compare: (a, b) => a.certificate.charCodeAt(0) - b.certificate.charCodeAt(0),
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '证件号码',
          dataIndex: 'certificateId',
          key:'certificateId',
          sorter: {
            compare: (a, b) => a.certificateId.charCodeAt(0) - b.certificateId.charCodeAt(0),
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '手机号',
          dataIndex: 'phone',
          key:'3',
          sorter: {
            compare: (a, b) => a.phone - b.phone  ,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '备注',
          dataIndex: 'content',
          key:'4',
          sorter: {
            compare: (a, b) => a.content.charCodeAt(0) - b.content.charCodeAt(0),
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '详细地址',
          dataIndex: 'detailAddress',
          key:'5',
          sorter: {
            compare: (a, b) => a.detailAddress.charCodeAt(0) - b.detailAddress.charCodeAt(0),
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '创建人',
          dataIndex: 'employeeCreateName',
          key:'6',
          sorter: {
            compare: (a, b) => a.employeeCreateName.charCodeAt(0) - b.employeeCreateName.charCodeAt(0),
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '负责人ID',
          dataIndex: 'employeeResponsibleId',
          key:'7',
          sorter: {
            compare: (a, b) => a.employeeResponsibleId - b.employeeResponsibleId,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '更新时间',
          dataIndex: 'updateTime',
          key:'8',
          sorter: {
            compare: (a, b) => a.updateTime - b.updateTime,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '下次交谈时间',
          dataIndex: 'nextTalkTime',
          key:'9',
          sorter: {
            compare: (a, b) => a.nextTalkTime - b.nextTalkTime,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '负责人',
          dataIndex: 'employeeResponsible',
          key:'employeeResponsible',
          fixed:'right',
          sorter: {
            compare: (a, b) => a.personInCharge - b.personInCharge,
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