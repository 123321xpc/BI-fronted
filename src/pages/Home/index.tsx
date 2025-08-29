import Flex from '@/components/flex';
import FormModal, { FormModalRef, SchemaFunc } from '@/components/form-modal';
import Operators from '@/components/operators';
import { useRef } from 'react';

const HomePage: React.FC = () => {
  const ref = useRef<FormModalRef>(null);
  const schema: SchemaFunc = (form, modalType, isEdit) => {
    return {
      id: {
        remove: !isEdit,
      },
      name: {
        remove: modalType === 'delete',
      },
    };
  };

  return (
    <Flex vertical>
      <FormModal schema={schema} ref={ref} trigger={false} />
      <Operators
        options={[
          {
            key: 'add',
            text: 'Add',
            onClick: () => ref.current?.add(),
          },
          {
            key: 'edit',
            text: 'Edit',
            onClick: () => ref.current?.edit(),
          },
        ]}
      />
    </Flex>
  );
};

export default HomePage;
