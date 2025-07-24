import { FORM_MODAL_TYPE, FormModalType } from '@/components/FormModal/config';
import QuickForm, { QuickFormProps, Schema } from '@/components/QuickForm';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  FormInstance,
  ModalForm,
  ProForm,
} from '@ant-design/pro-components';
import { Button, message, ModalProps } from 'antd';
import {
  forwardRef,
  MutableRefObject,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { ResultType } from '../../../config/request';
import useForm = ProForm.useForm;

/**
 *  提交表单有以下3种方法（优先级递减）：
 *  - 1. 传入onSubmit，直接交给外部处理
 *  - 2. 传入submitApi，使用submitApi接口提交表单
 *  - 3. 传入service，使用service接口的方法提交表单
 *
 *  如果是和表格配合使用，可以传入tableRef自动刷新表格
 */

type Props = {
  layout?: 'horizontal' | 'vertical';
  tableRef?: MutableRefObject<ActionType>;
  schema: Schema;
  trigger?: ReactNode | string;
  initialValue?: any;
  objName?: string;
  submitApi?: any | any[];
  formProps?: Omit<QuickFormProps, 'schema'>;
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
    operatingType = FORM_MODAL_TYPE.add.key,
    initialValue,
    objName,
    tableRef,
    submitApi,
    title,
    formProps = {},
    onSubmit,
    onSuccess,
    layout = 'horizontal',
    ...rest
  } = props;

  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const isCreate = operatingType === FORM_MODAL_TYPE.add.key;
  const [type, setType] = useState<FormModalType>(operatingType);

  const filterSchema = useMemo(() => {
    const newSchema = { ...schema };

    if (type === FORM_MODAL_TYPE.add.key) {
      delete newSchema.id;
    }

    return newSchema;
  }, [schema, type]);

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    share: (initialValues?: any, type?: FormModalType) => {
      //  share默认为编辑窗口
      setType(type || FORM_MODAL_TYPE.update.key);
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

    const api = Array.isArray(submitApi)
      ? submitApi[
          FORM_MODAL_TYPE[type as keyof typeof FORM_MODAL_TYPE]?.submitApiIdx
        ]
      : submitApi;

    if (api) {
      const values = await form.validateFields();

      if (type === FORM_MODAL_TYPE.add.key) {
        delete values.id;
      }

      const res: ResultType<any> = await api(values);

      if (res.success) {
        if (tableRef) {
          tableRef.current?.reload();
        }

        if (onSuccess) {
          onSuccess(res, form);
        }
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
    setType(FORM_MODAL_TYPE.add.key);
    form.resetFields();
  };

  const handleOpenChange = (open: boolean) => {
    return open ? handleOpen() : handleClose();
  };

  const finalTrigger = trigger ? (
    trigger
  ) : (
    <Button
      icon={isCreate ? <PlusOutlined /> : undefined}
      type={isCreate ? 'primary' : 'link'}
    >
      {trigger || '创建用户'}
    </Button>
  );

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
      trigger={finalTrigger}
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
        schema={filterSchema}
        initialValues={initialValue}
        layout={layout}
      />
    </ModalForm>
  );
});

export default Component;
