import QuickForm, { QuickFormProps, Schema } from '@/components/QuickForm';
import {
  ModalForm,
  ProFormInstance,
  ProFormProps,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { ReactNode, useRef } from 'react';

type Props = ProFormProps & {
  layout?: 'horizontal' | 'vertical' | 'inline';
  schema: Schema;
  trigger?: ReactNode;
  width?: number;
  initialValue?: any;
  OperatingType?: string;
  objName?: string;
  submitApi: (params: any) => Promise<any>;
  okText?: string;
  cancelText?: string;
  title?: string;
  formProps?: Omit<QuickFormProps, 'schema'>;
  operatingType?: string;
  onSuccess?: (result: any, formValues: any, formRef: any) => boolean;
  onSubmit?: (formValues: any) => boolean;
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
    formProps = {},
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
      <QuickForm schema={schema} {...formProps} />
    </ModalForm>
  );
};

export default Component;
