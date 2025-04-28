import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';

export default () => {
  const [form] = Form.useForm<{ name: string; company: string }>();

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="Create New Form"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          添加用户
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="Contract Customer Name"
          tooltip="Up to 24 characters"
          placeholder="Please enter a name"
        />

        <ProFormText
          width="md"
          name="company"
          label="Our Company Name"
          placeholder="Please enter a name"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="contract"
          label="Contract Name"
          placeholder="Please enter a name"
        />
        <ProFormDateRangePicker
          name="contractTime"
          label="Contract Effective Time"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
