import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  FormInstance,
  ModalForm,
  ProForm,
} from '@ant-design/pro-components';
import { Button, Form, message, ModalProps } from 'antd';
import {
  forwardRef,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import QuickForm, { QuickFormProps, Schema } from 'src/components/quick-form';
import { ResultType } from '../../../config/request';
import useForm = ProForm.useForm;

export type SchemaFunc = (
  form: FormInstance,
  isEdit: boolean,
  watchFields: any,
) => Schema;

type OptType = 'Add' | 'Edit';

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
   * @description 表单结构定义（quick-form 的 schema）
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
   * @description 表单提交的 API 方法，可以是单个方法，也可以是数组(数组中add方法放入0号位置，edit方法放入1号位置)
   */
  submitApi?: any | any[];

  /**
   * @description 传递给 quick-form 的额外属性（除 schema 外）
   */
  formProps?: Omit<QuickFormProps, 'schema'>;

  /**
   * @description 表单提交成功后的回调
   */
  onSuccess?: (result: ResultType<any>, form: FormInstance) => boolean;

  /**
   * @description 自定义提交方法，返回布尔值。若设置该方法，则不会调用 submitApi
   */
  onSubmit?: (form: FormInstance) => boolean;

  /**
   * @description 表单监听字段，用于表单联动
   */
  watchFields?: string | string[];
} & ModalProps;

export type FormModalRef = {
  add: (initialValues?: any) => void;
  edit: (initialValues?: any) => void;
  close: () => void;
  form: FormInstance;
};

const Component = forwardRef<FormModalRef, Props>((props, ref) => {
  const {
    schema,
    trigger,
    initialValue,
    objName = '用户',
    tableRef,
    submitApi,
    title,
    formProps = {},
    onSubmit,
    onSuccess,
    layout = 'horizontal',
    watchFields = '',
    ...rest
  } = props;

  // antd-pro form 实例
  const [form] = useForm();
  const [open, setOpen] = useState(false); // 控制 ModalForm 显示
  const [type, setType] = useState<OptType>('Add'); // 当前操作类型

  // 是否为创建模式
  const isCreate = useMemo(() => type === 'Add', [type]);

  const selector = useCallback(
    (values: any) => {
      return Array.isArray(watchFields)
        ? watchFields.reduce((acc: any, key: string) => {
            acc[key] = values[key];
            return acc;
          }, {} as any)
        : values[watchFields];
    },
    [watchFields],
  );

  const watch = Form.useWatch(selector, form);

  useEffect(() => {
    console.log('watch', watch);
  }, [watch]);

  // 暴露方法给父组件调用
  useImperativeHandle(ref, () => ({
    add: (initialValues?: any) => handleOpen('Add', initialValues),
    edit: (initialValues?: any) => handleOpen('Edit', initialValues),
    close: handleClose,
    form,
  }));

  /**
   * 提交处理逻辑
   */
  const handleSubmit = useCallback(async () => {
    if (!form) {
      return Promise.reject('No form instance found');
    }

    // 优先使用自定义 onSubmit
    if (onSubmit) return onSubmit(form);

    const api = Array.isArray(submitApi)
      ? submitApi[isCreate ? 0 : 1]
      : submitApi;

    if (api) {
      const values = await form.validateFields();

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
  }, [form, isCreate]);

  const handleOpen = (type?: OptType, initValues?: any) => {
    setType(type || 'Add');
    form.setFieldsValue(initValues || {});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields(); // 清空表单
  };

  const finalTitle = useMemo(() => {
    return title || `${isCreate ? '新增' : '编辑'}${objName}`;
  }, [type, title, objName, isCreate]);

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
  }, [trigger, isCreate]);

  const finalSchema = useMemo(() => {
    return typeof schema === 'function'
      ? schema(form, type === 'Edit', watch)
      : schema;
  }, [schema, type, form, watch]);

  return (
    <ModalForm
      layout={layout}
      title={finalTitle}
      open={open}
      trigger={finalTrigger as any}
      initialValues={initialValue}
      autoFocusFirstInput
      onFinish={handleSubmit as any}
      modalProps={{
        destroyOnClose: true,
        onCancel: handleClose,
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
