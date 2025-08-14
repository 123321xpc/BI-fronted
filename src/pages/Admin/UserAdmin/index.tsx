import {
  addUserUsingPost,
  listUserByPageUsingPost,
  updateUserUsingPost,
} from '@/api/userController';
import { useColumn } from '@/pages/Admin/UserAdmin/useColumn';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { MutableRefObject, useRef } from 'react';
import FormModal, { FormModalRef } from 'src/components/form-modal';
import { Schema } from 'src/components/quick-form';
import { DEFAULT_PAGE_SIZE } from '../../../../config';

const schema: Schema = {
  id: {},
  userName: {
    label: '昵称',
  },
  userAccount: {
    label: '账号',
  },
};

export default () => {
  const modalRef = useRef<FormModalRef>(null);
  const tableRef = useRef<MutableRefObject<ActionType>>(null);
  const columns = useColumn(modalRef, tableRef as any);

  const handleRequest = async (params: API.UserQueryRequest) => {
    const res = await listUserByPageUsingPost(params);
    if (res.success) {
      return {
        success: true,
        data: res.data?.records,
        total: res.data?.total,
      };
    }
  };

  return (
    <ProTable
      columns={columns}
      actionRef={tableRef as any}
      cardBordered
      request={handleRequest as any}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: DEFAULT_PAGE_SIZE,
      }}
      headerTitle="User Admin"
      toolBarRender={() => [
        <FormModal
          operatingType={'add'}
          ref={modalRef}
          tableRef={tableRef as any}
          schema={schema}
          objName={'用户'}
          onSuccess={() => message.success('操作成功') as any}
          submitApi={[addUserUsingPost, updateUserUsingPost]}
          formProps={{
            labelCol: { span: 2 },
          }}
        />,
      ]}
    />
  );
};
