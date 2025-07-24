import { deleteUserUsingPost } from '@/api/userController';
import { FormModalRef } from '@/components/FormModal';
import { FORM_MODAL_TYPE } from '@/components/FormModal/config';
import Operators from '@/components/Operators';
import { ActionType } from '@ant-design/pro-components';
import { message } from 'antd';
import { MutableRefObject, RefObject } from 'react';

export const useColumn = (
  modalRef: RefObject<FormModalRef>,
  tableRef: MutableRefObject<ActionType>,
) => {
  return [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 48,
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
      valueType: 'option',
      width: 120,
      render: (_: any, record: API.User) => {
        return (
          <Operators
            options={[
              {
                key: FORM_MODAL_TYPE.update.key,
                text: FORM_MODAL_TYPE.update.label,
                click: () => modalRef.current?.share(record),
              },
              {
                key: 'delete',
                text: '删除',
                color: 'danger',
                click: () => {
                  deleteUserUsingPost({ id: record.id }).then((res) => {
                    if (res.success) {
                      message.success('删除成功');
                      tableRef.current?.reload();
                    }
                  });
                },
              },
            ]}
          />
        );
      },
    },
  ];
};
