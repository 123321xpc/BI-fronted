import { SelectOptionType } from '@/types';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormInstance,
  ProFormProps,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { ReactNode, useRef } from 'react';

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
  };
};

type Props = ProFormProps & {
  layout?: 'horizontal' | 'vertical' | 'inline';
  schema: Schema;
  trigger?: ReactNode;
  width?: number; // 弹窗宽度，默认 600
  initialValue?: any;
  OperatingType?: string; //  操作类型：新增或编辑...
  objName?: string;
  submitApi: (params: any) => Promise<any>;
  okText?: string;
  cancelText?: string;
  title?: string;
  operatingType?: string;
  onSuccess?: (result: any, formValues: any, formRef: any) => boolean;
  onSubmit?: (formValues: any) => boolean; // 返回true，关闭弹窗，返回false，不关闭弹窗
};

const Component = (props: Props) => {
  const {
    schema,
    trigger,
    operatingType,
    width,
    initialValue,
    OperatingType,
    objName,
    submitApi,
    okText,
    cancelText,
    title,
    onSubmit,
    onSuccess,
    layout = 'horizontal',
    ...rest
  } = props;

  const formRef = useRef<ProFormInstance>();

  const handleSubmit = async (formValues: any) => {
    if (onSubmit) return onSubmit(formValues);

    const res = await submitApi(formValues);

    if (onSuccess) return onSuccess(res, formValues, formRef);

    return res.success;
  };

  return (
    <ModalForm
      layout={layout}
      title={title || `${operatingType} ${objName}`}
      trigger={
        (trigger as any) ?? (
          <Button type="link">
            {OperatingType} {objName}
          </Button>
        )
      }
      initialValues={initialValue}
      autoFocusFirstInput
      onFinish={handleSubmit as any}
      formRef={formRef}
      modalProps={{
        destroyOnClose: true,
        okText,
        cancelText,
        width,
      }}
      {...rest}
    >
      {Object.keys(schema).map((key) => {
        const { label, type = 'input', ...rest } = schema[key];
        switch (type) {
          case 'input':
            return (
              <ProFormText
                key={key}
                name={key}
                label={label || key}
                {...rest}
              />
            );
          case 'select':
            return (
              <ProFormSelect
                key={key}
                name={key}
                label={label || key}
                {...rest}
              />
            );
          case 'textarea':
            return (
              <ProFormTextArea
                key={key}
                name={key}
                label={label || key}
                {...rest}
              />
            );
          case 'number':
            return (
              <ProFormDigit
                key={key}
                name={key}
                label={label || key}
                {...rest}
              />
            );
          case 'checkbox':
            return (
              <ProFormCheckbox
                key={key}
                name={key}
                label={label || key}
                {...rest}
              />
            );
        }
      })}
    </ModalForm>
  );
};

export default Component;
