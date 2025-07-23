import { FORM_MODAL_TYPE, FormModalType } from '@/components/FormModal/config';
import QuickForm, { QuickFormProps, Schema } from '@/components/QuickForm';
import { FormInstance, ModalForm, ProForm } from '@ant-design/pro-components';
import { Button, message, ModalProps } from 'antd';
import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';
import { ResultType } from '../../../config/request';
import useForm = ProForm.useForm;

/**
 *  提交表单有以下3种方法（优先级递减）：
 *  - 1. 传入onSubmit，直接交给外部处理
 *  - 2. 传入submitApi，使用submitApi接口提交表单
 *  - 3. 传入service，使用service接口的方法提交表单
 */

type Props = {
  layout?: 'horizontal' | 'vertical';
  schema: Schema;
  trigger: ReactNode | string;
  initialValue?: any;
  objName?: string;
  service?: any; // 创建和编辑窗口，传入service对象
  submitApi?: (params?: any) => Promise<ResultType<any>>; // 其他窗口，传入submitApi
  formProps?: QuickFormProps;
  operatingType?: FormModalType;
  onSuccess?: (result: ResultType<any>, form: FormInstance) => boolean;
  onSubmit?: (form: FormInstance) => boolean;
} & ModalProps;

export type FormModalRef = {
  open: () => void;
  close: () => void;
  share: (initialValues?: any, type?: FormModalType) => void;
  form: FormInstance;
};

const Component = forwardRef<FormModalRef, Props>((props, ref) => {
  const {
    schema,
    trigger,
    operatingType = 'create',
    initialValue,
    objName,
    submitApi,
    title,
    formProps = {},
    onSubmit,
    onSuccess,
    service,
    layout = 'horizontal',
    ...rest
  } = props;

  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<FormModalType>(operatingType);

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    share: (initialValues?: any, type?: FormModalType) => {
      //  share默认为编辑窗口
      setType(type || 'edit');
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
      handleOpen();
    },
    form,
  }));

  const handleSubmit = async () => {
    if (!form) {
      return Promise.reject('No form instance found');
    }

    if (onSubmit) return onSubmit(form);

    const api = submitApi ? submitApi : service[type];

    if (api) {
      const values = await form.validateFields();

      if (type === 'create') {
        delete values.id;
      }

      const res = await api(values);
      if (res.success && onSuccess) {
        onSuccess(res.data, form);
      }

      return res.success;
    }

    Promise.reject('No submitApi provided');
    message.error(`type = ${type}, 无 API 提供， 无法提交表单`);

    return false;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setType('create');
    form.resetFields();
  };

  const handleOpenChange = (open: boolean) => {
    return open ? handleOpen() : handleClose();
  };

  return (
    <ModalForm
      layout={layout}
      title={
        title ||
        `${
          FORM_MODAL_TYPE[type as keyof typeof FORM_MODAL_TYPE]?.label
        }${objName}`
      }
      open={open}
      onOpenChange={handleOpenChange}
      trigger={
        typeof trigger === 'string'
          ? ((<Button type="link">{trigger}</Button>) as any)
          : trigger
      }
      initialValues={initialValue}
      autoFocusFirstInput
      onFinish={handleSubmit as any}
      modalProps={{
        destroyOnClose: true,
        ...rest,
      }}
    >
      <QuickForm
        {...formProps}
        form={form}
        footer={false}
        schema={schema}
        initialValues={initialValue}
        layout={layout}
      />
    </ModalForm>
  );
});

export default Component;
