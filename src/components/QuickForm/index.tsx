import { SelectOptionType } from '@/types';
import type {
  FormInstance,
  ProFormProps,
  SubmitterProps,
} from '@ant-design/pro-components';
import {
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { forwardRef, useImperativeHandle } from 'react';
import { ResultType } from '../../../config/request';
import useForm = ProForm.useForm;

/**
 * @description 表单字段配置 Schema，每个字段的配置项
 */
export type Schema = {
  [key: string]: {
    /** @description 字段标签 */
    label?: string;
    /** @description 字段提示信息 */
    tooltip?: string;
    /** @description 输入框占位符 */
    placeholder?: string;
    /** @description 表单项类型 */
    type?: 'input' | 'textarea' | 'number' | 'select' | 'checkbox' | 'radio';
    /** @description 下拉框、单选、多选的可选项 */
    options?: SelectOptionType[];
    /** @description 校验规则（antd rule 格式） */
    rules?: any[];
    /** @description Select 选择模式（multiple/tags） */
    mode?: 'multiple' | 'tags';
    /** @description 是否允许清空 */
    allowClear?: boolean;
    /** @description 是否移除该字段 */
    remove?: boolean;
    /** @description 是否隐藏该字段 */
    hidden?: boolean;
    /** @description 栅格布局配置 */
    colProps?: any;
  };
};

/**
 * @description QuickForm 暴露给外部的 ref 类型
 */
export type QuickFormRef = {};

/**
 * @description QuickForm 组件的 Props 定义
 */
export type QuickFormProps = {
  /** @description 表单字段配置 Schema */
  schema: Schema;
  /** @description 表单列数（用于 grid 布局），默认 1 列 */
  columns?: number;
  /** @description 底部提交栏配置，false 表示不显示 */
  footer?: false | SubmitterProps;
  /** @description 提交时调用的接口函数，返回 Promise */
  api?: (params: any) => Promise<ResultType<any>>;
  /** @description 提交事件回调（优先于 api） */
  onSubmit?: (form: FormInstance) => void;
  /** @description 提交成功回调 */
  onSuccess?: (res: any, form: FormInstance) => void;
} & Omit<ProFormProps, 'colProps' | 'onFinish' | 'submitter'>;

/**
 * @description 快速表单组件，基于 @ant-design/pro-components 的 ProForm 封装
 * - 支持通过 schema 动态渲染不同类型的表单项
 * - 支持自定义提交逻辑或自动调用 api
 */
const QuickForm = forwardRef<QuickFormRef, QuickFormProps>(
  (
    { schema, columns = 1, footer, onSubmit, onSuccess, api, ...props },
    ref,
  ) => {
    // 默认列宽计算（24 栅格除以列数）
    const defaultColProps = { span: 24 / columns };

    // 创建表单实例
    const [form] = useForm() as [form: FormInstance];

    /**
     * @description 表单提交逻辑
     * - 如果有 onSubmit 则优先执行
     * - 否则执行 api 请求并在成功后调用 onSuccess
     */
    const handleSubmit = () => {
      if (onSubmit) return onSubmit(form);

      if (api) {
        api(form.getFieldsValue()).then((res) => {
          if (onSuccess) {
            onSuccess(res.data, form);
          }
        });
      }
    };

    // 暴露 ref 方法（这里暂时为空对象）
    useImperativeHandle(ref, () => ({}));

    return (
      <ProForm
        grid
        form={form}
        submitter={footer as any}
        onFinish={handleSubmit}
        {...props}
        {...(footer !== undefined ? { submitter: footer } : {})}
      >
        {Object.keys(schema)
          .filter((key) => !schema[key].remove)
          .map((key) => {
            const {
              label,
              type = 'input',
              colProps,
              rules,
              tooltip,
              ...rest
            } = schema[key];

            // 公共属性
            const commonProps = {
              name: key,
              label: label || key,
              tooltip,
              rules,
              colProps: colProps ?? defaultColProps,
              ...rest,
            };

            // 按 type 渲染对应表单组件
            switch (type) {
              case 'input':
                return <ProFormText key={key} {...commonProps} />;
              case 'select':
                return <ProFormSelect key={key} {...commonProps} />;
              case 'textarea':
                return <ProFormTextArea key={key} {...commonProps} />;
              case 'number':
                return <ProFormDigit key={key} {...commonProps} />;
              case 'checkbox':
                return <ProFormCheckbox key={key} {...commonProps} />;
              case 'radio':
                return (
                  <ProFormRadio.Group
                    key={key}
                    {...commonProps}
                    options={rest.options}
                  />
                );
              default:
                return null;
            }
          })}
      </ProForm>
    );
  },
);

export default QuickForm;
