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

export type SchemaFunc = (
  form: FormInstance,
  modalType: FormModalType | string,
) => Schema;

type Props = {
  /**
   * @description 表单布局方式，可选 horizontal（水平）或 vertical（垂直），默认 horizontal
   */
  layout?: 'horizontal' | 'vertical';

  /**
   * @description 可选，表格的 ref 对象。传入后在表单提交成功时会自动调用 tableRef.current.reload() 刷新表格
   */
  tableRef?: MutableRefObject<ActionType>;

  /**
   * @description 表单结构定义（QuickForm 的 schema）
   */
  schema: Schema | SchemaFunc;

  /**
   * @description 自定义触发器（按钮或任意节点）。不传时将使用默认按钮
   */
  trigger?: ReactNode | string;

  /**
   * @description 表单初始值
   */
  initialValue?: any;

  /**
   * @description 操作对象名称，会拼接在弹窗标题后，例如“新增用户”、“编辑合同”
   */
  objName?: string;

  /**
   * @description 表单提交的 API 方法，可以是单个方法，也可以是按操作类型分的数组(数组中各方法的位置需要在config.ts中配置)
   */
  submitApi?: any | any[];

  /**
   * @description 传递给 QuickForm 的额外属性（除 schema 外）
   */
  formProps?: Omit<QuickFormProps, 'schema'>;

  /**
   * @description 当前操作类型（新增/编辑），默认 FORM_MODAL_TYPE.add.key
   */
  operatingType?: FormModalType;

  /**
   * @description 表单提交成功后的回调
   */
  onSuccess?: (result: ResultType<any>, form: FormInstance) => boolean;

  /**
   * @description 自定义提交方法，返回布尔值。若设置该方法，则不会调用 submitApi
   */
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
    objName = '用户',
    tableRef,
    submitApi,
    title,
    formProps = {},
    onSubmit,
    onSuccess,
    layout = 'horizontal',
    ...rest
  } = props;

  // antd-pro form 实例
  const [form] = useForm();
  const [open, setOpen] = useState(false); // 控制 ModalForm 显示
  const [type, setType] = useState<FormModalType>(operatingType); // 当前操作类型

  // 是否为创建模式
  const isCreate = useMemo(() => type === FORM_MODAL_TYPE.add.key, [type]);

  // 暴露方法给父组件调用
  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    share: (initialValues?: any, type?: FormModalType) => {
      // 默认打开为编辑模式
      setType(type || FORM_MODAL_TYPE.update.key);
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
      handleOpen();
    },
    form,
  }));

  /**
   * 提交处理逻辑
   */
  const handleSubmit = async () => {
    if (!form) {
      return Promise.reject('No form instance found');
    }

    // 优先使用自定义 onSubmit
    if (onSubmit) return onSubmit(form);

    // 获取对应 API（如果是数组则按类型选择）
    const api = Array.isArray(submitApi)
      ? submitApi[
          FORM_MODAL_TYPE[type as keyof typeof FORM_MODAL_TYPE]?.submitApiIdx
        ]
      : submitApi;

    if (api) {
      const values = await form.validateFields();

      // 新增时移除 id
      if (type === FORM_MODAL_TYPE.add.key) {
        delete values.id;
      }

      const res: ResultType<any> = await api(values);

      if (res.success) {
        // 刷新表格
        tableRef?.current?.reload();

        // 成功回调
        onSuccess?.(res, form);
      }

      return res.success;
    }

    // 无 API 提示
    Promise.reject('No submitApi provided');
    message.error(`type = ${type}, 无 API 提供， 无法提交表单`);
    return false;
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setType(FORM_MODAL_TYPE.add.key); // 重置为新增模式
    form.resetFields(); // 清空表单
  };

  // ModalForm 的 open 状态变化时同步处理
  const handleOpenChange = (open: boolean) => {
    return open ? handleOpen() : handleClose();
  };

  // 触发按钮，未传入 trigger 时使用默认
  const finalTrigger = useMemo(() => {
    if (trigger === false || trigger === null) return null;
    return trigger ? (
      trigger
    ) : (
      <Button
        icon={isCreate ? <PlusOutlined /> : undefined}
        type={isCreate ? 'primary' : 'link'}
      >
        {trigger || '创建用户'}
      </Button>
    );
  }, [trigger]);

  const finalSchema = useMemo(() => {
    console.log(
      'finalSchema',
      typeof schema === 'function' ? schema(form, type) : schema,
    );
    return typeof schema === 'function' ? schema(form, type) : schema;
  }, [schema, type]);

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
      trigger={finalTrigger as any}
      initialValues={initialValue}
      autoFocusFirstInput
      onFinish={handleSubmit as any}
      modalProps={{
        destroyOnClose: true,
        ...rest,
      }}
    >
      <QuickForm
        style={{ marginTop: 16 }}
        {...formProps}
        form={form}
        footer={false}
        schema={finalSchema}
        initialValues={initialValue}
        layout={layout}
      />
    </ModalForm>
  );
});

export default Component;
