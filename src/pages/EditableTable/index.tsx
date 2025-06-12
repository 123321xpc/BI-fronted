import { RESULT_CODE } from '@/constants/';
import AddModal from '@/pages/EditableTable/AddModal';
import { listUserByPageUsingPost } from '@/service/api/userController';
import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button, Flex } from 'antd';
import React, { useState } from 'react';

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  update_at?: number;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '活动名称一',
    readonly: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: 1590486176000,
    update_at: 1590486176000,
  },
  {
    id: 624691229,
    title: '活动名称二',
    readonly: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: 1590481162000,
    update_at: 1590481162000,
  },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      dataIndex: 'id',
      title: 'ID',
    },
    {
      dataIndex: 'userName',
      title: '昵称',
    },
    {
      dataIndex: 'userAccount',
      title: '账号',
      sorter: true,
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      render: (text, record, _, action) => (
        <Flex>
          <Button
            type={'link'}
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </Button>
          <Button
            type={'link'}
            danger
            key="delete"
            onClick={() => {
              setDataSource(dataSource.filter((item) => item.id !== record.id));
            }}
          >
            删除
          </Button>
        </Flex>
      ),
    },
  ];

  const handleRequest = async (params: API.UserQueryRequest) => {
    const res = await listUserByPageUsingPost(params);
    if (res.code === RESULT_CODE.SUCCESS && res.data) {
      return {
        success: true,
        data: res.data.records,
        total: res.data.total,
      };
    }
  };

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="可编辑表格"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={false}
        loading={false}
        toolBarRender={() => [<AddModal />]}
        columns={columns}
        request={handleRequest as any}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};
