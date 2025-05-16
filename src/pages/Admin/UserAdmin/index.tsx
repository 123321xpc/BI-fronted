import { DEFAULT_PAGE_SIZE, RESULT_CODE } from '@/constants';
import AddModal from '@/pages/Admin/UserAdmin/AddModal';
import { listUserByPageUsingPost } from '@/service/api/userController';
import { ProTable } from '@ant-design/pro-components';

const columns = [
  {
    dataIndex: 'id',
    title: 'ID',
    width: 48,
  },
  {
    dataIndex: 'userName',
    title: '昵称',
    width: 48,
  },
  {
    dataIndex: 'userAccount',
    title: '账号',
    width: 48,
    sorter: true,
  },
];

export default () => {
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
      toolBarRender={() => [<AddModal />]}
    />
  );
};
