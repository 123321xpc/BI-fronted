import FormModal, { FormModalRef } from '@/components/FormModal';
import MyFlex from '@/components/MyFLex';
import QuickForm from '@/components/QuickForm';
import { useAllSearchParams } from '@/hooks/useAllSearchParams';
import { Button } from 'antd';
import { useCallback, useRef } from 'react';

const HomePage: React.FC = () => {
  useAllSearchParams();
  const modalRef = useRef<FormModalRef>(null);
  const handleEdit = useCallback(() => {
    console.log('handleEdit', modalRef.current);
    modalRef.current?.share({ name: '张三', gender: 'Male' }, 'edit');
  }, [modalRef]);

  return (
    <MyFlex vertical>
      <FormModal
        trigger={'创建用户'}
        objName={'用户'}
        onSubmit={(form) => {
          console.log('onSubmit', form.getFieldsValue());
          return false;
        }}
        operatingType={'create'}
        ref={modalRef}
        schema={{
          name: {
            label: 'Name',
          },
          gender: {
            label: 'Gender',
            type: 'select',
            options: [
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ],
          },
        }}
      />
      <Button type="primary" onClick={handleEdit}>
        edit用户
      </Button>
      <QuickForm
        schema={{
          name: {
            label: 'Name',
            rules: [{ required: true, message: 'Please input your name!' }],
          },
          gender: {
            label: 'Gender',
            type: 'select',
            options: [
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ],
          },
        }}
      />
    </MyFlex>
  );
};

export default HomePage;
