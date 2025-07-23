import { SelectOptionType } from '@/types';
import type { ProFormProps } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';

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
    colProps?: any;
  };
};

/**
 * QuickForm Props：继承 ProFormProps + 自定义 schema
 */
type QuickFormProps = {
  schema: Schema;
  columns?: number;
} & Omit<ProFormProps, 'colProps'>;

const QuickForm = ({ schema, columns = 1, ...props }: QuickFormProps) => {
  const defaultColProps = { span: 24 / columns };
  return (
    <ProForm grid {...props}>
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
            colProps: colProps ?? defaultColProps, // 优先字段配置，否则使用默认
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
            default:
              return null;
          }
        })}
    </ProForm>
  );
};

export default QuickForm;
