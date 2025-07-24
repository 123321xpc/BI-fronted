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
 * 表单结构定义
 */
export type Schema = {
  [key: string]: {
    label?: string;
    tooltip?: string;
    placeholder?: string;
    type?: 'input' | 'textarea' | 'number' | 'select' | 'checkbox' | 'radio';
    options?: SelectOptionType[];
    rules?: any[];
    mode?: 'multiple' | 'tags';
    allowClear?: boolean;
    remove?: boolean;
    hidden?: boolean;
    colProps?: any;
  };
};

export type QuickFormRef = {};

/**
 * QuickForm Props：继承 ProFormProps + 自定义 schema
 */
export type QuickFormProps = {
  schema: Schema;
  columns?: number;
  footer?: false | SubmitterProps;
  api?: (params: any) => Promise<ResultType<any>>;
  onSubmit?: (form: FormInstance) => void;
  onSuccess?: (res: any, form: FormInstance) => void;
} & Omit<ProFormProps, 'colProps' | 'onFinish'>;

const QuickForm = forwardRef<QuickFormRef, QuickFormProps>(
  (
    { schema, columns = 1, footer, onSubmit, onSuccess, api, ...props },
    ref,
  ) => {
    const defaultColProps = { span: 24 / columns };
    const [form] = useForm() as [form: FormInstance];

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

    useImperativeHandle(ref, () => ({}));

    return (
      <ProForm
        grid
        form={form}
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

            const commonProps = {
              name: key,
              label: label || key,
              tooltip,
              rules,
              colProps: colProps ?? defaultColProps,
              ...rest,
            };

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
