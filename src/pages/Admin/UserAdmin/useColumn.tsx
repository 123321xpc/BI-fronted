import { deleteUserUsingPost } from '@/api/userController';
import { FormModalRef } from '@/components/FormModal';
import { FORM_MODAL_TYPE } from '@/components/FormModal/config';
import Operators from '@/components/Operators';
import { red } from '@ant-design/colors';
import { message } from 'antd';
import { RefObject } from 'react';

export const useColumn = (modalRef: RefObject<FormModalRef>) => {
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
                color: red[5],
                click: () => {
                  deleteUserUsingPost({ id: record.id }).then((res) => {
                    if (res.success) {
                      message.success('删除成功');
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
