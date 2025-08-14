type ObjType = {
  [key: string]: {
    key: FormModalType;
    label: string; //  标题的拼接字段
    submitApiIdx: number; //  对应api的索引（submitApi为数组时使用）
  };
};

export const FORM_MODAL_TYPE: ObjType = {
  update: {
    key: 'update',
    label: '编辑',
    submitApiIdx: 1,
  },
  add: {
    key: 'add',
    label: '创建',
    submitApiIdx: 0,
  },
  delete: {
    key: 'delete',
    label: '删除',
    submitApiIdx: 1,
  },
};

export type FormModalType = 'update' | 'add' | 'delete' | string;
