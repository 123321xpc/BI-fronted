import { deleteUserUsingPost } from '@/api/userController';
import { FormModalRef } from '@/components/form-modal';
import { FORM_MODAL_TYPE } from '@/components/form-modal/config';
import Operators from '@/components/operators';
import { ColumnsType, useColumnProps } from '@/hooks/useColumnProps';
import { ActionType } from '@ant-design/pro-components';
import { message } from 'antd';
import { MutableRefObject, RefObject, useMemo } from 'react';

export const useColumn = (
  modalRef: RefObject<FormModalRef>,
  tableRef: MutableRefObject<ActionType>,
) => {
  const columns: ColumnsType = useMemo(() => {
    return {
      id: {
        title: 'ID',
        width: 48,
      },
      userName: {
        title: '昵称',
      },
      userAccount: {
        title: '账号',
      },
      operation: {
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
                  onClick: () => modalRef.current?.share(record),
                },
                {
                  key: 'delete',
                  text: '删除',
                  color: 'danger',
                  onClick: () => {
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
    };
  }, [modalRef, tableRef]);

  return useColumnProps(columns);

  // return [
  //   {
  //     dataIndex: 'id',
  //     title: 'ID',
  //     width: 48,
  //   },
  //   {
  //     dataIndex: 'userName',
  //     title: '昵称',
  //   },
  //   {
  //     dataIndex: 'userAccount',
  //     title: '账号',
  //     sorter: true,
  //   },
  //   {
  //     title: '操作',
  //     valueType: 'option',
  //     width: 120,
  //     render: (_: any, record: API.User) => {
  //       return (
  //         <operators
  //           options={[
  //             {
  //               key: FORM_MODAL_TYPE.update.key,
  //               text: FORM_MODAL_TYPE.update.label,
  //               click: () => modalRef.current?.share(record),
  //             },
  //             {
  //               key: 'delete',
  //               text: '删除',
  //               color: 'danger',
  //               click: () => {
  //                 deleteUserUsingPost({ id: record.id }).then((res) => {
  //                   if (res.success) {
  //                     message.success('删除成功');
  //                     tableRef.current?.reload();
  //                   }
  //                 });
  //               },
  //             },
  //           ]}
  //         />
  //       );
  //     },
  //   },
  // ];
};
