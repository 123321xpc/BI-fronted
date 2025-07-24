type ObjType = {
  [key: string]: {
    key: string;
    label: string; // 标签名
    submitApiIdx: number; // submitApi 数组中对应api存放的位置
  };
};
export const FORM_MODAL_TYPE = {
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
};

export type FormModalType = 'update' | 'add' | string;
