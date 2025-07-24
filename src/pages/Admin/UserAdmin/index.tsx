import {
  addUserUsingPost,
  listUserByPageUsingPost,
  updateUserUsingPost,
} from '@/api/userController';
import FormModal, { FormModalRef } from '@/components/FormModal';
import { Schema } from '@/components/QuickForm';
import { useColumn } from '@/pages/Admin/UserAdmin/useColumn';
import { ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useRef } from 'react';
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
  const columns = useColumn(modalRef);

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
          ref={modalRef}
          schema={schema}
          objName={'用户'}
          onSuccess={() => message.success('操作成功') as any}
          submitApi={[addUserUsingPost, updateUserUsingPost]}
          formProps={{
            labelCol: { span: 2 },
          }}
          trigger={<Button type="primary">创建用户</Button>}
        />,
      ]}
    />
  );
};
