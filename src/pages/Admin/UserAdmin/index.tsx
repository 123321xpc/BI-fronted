import AddModal from '@/pages/Admin/UserAdmin/AddModal';
import { ProTable } from '@ant-design/pro-components';

const data = [
  {
    id: 1,
    name: 'John',
    email: 'john@example.com',
  },
  {
    id: 2,
    name: 'Mary',
    email: 'mary@example.com',
  },
];

const columns = [
  {
    dataIndex: 'id',
    title: 'ID',
    width: 48,
  },
  {
    dataIndex: 'name',
    title: '姓名',
    width: 48,
  },
  {
    dataIndex: 'email',
    title: '邮箱',
    width: 48,
  },
];

export default () => {
  return (
    <ProTable
      columns={columns}
      cardBordered
      dataSource={data}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      headerTitle="User Admin"
      toolBarRender={() => [<AddModal />]}
    />
  );
};
