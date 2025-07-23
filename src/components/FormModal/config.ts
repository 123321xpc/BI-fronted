//  若要使用form-modal的 service 方法配置 api 接口，需要在此配置字段名
export const FORM_MODAL_TYPE = {
  edit: {
    label: '编辑',
  },
  create: {
    label: '创建',
  },
};

export type FormModalType = keyof typeof FORM_MODAL_TYPE | string;
