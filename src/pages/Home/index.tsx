import Flex from '@/components/Flex';
import { Button } from 'antd';
import { useCallback, useRef } from 'react';
import FormModal, { FormModalRef, SchemaFunc } from 'src/components/form-modal';

const HomePage: React.FC = () => {
  const modalRef = useRef<FormModalRef>(null);

  const schema = useCallback<SchemaFunc>((form, modalType) => {
    return {
      id: {
        remove: modalType === 'add', // 在新增时，删除 id 字段
      },
      name: {},
    };
  }, []);

  return (
    <Flex vertical>
      <Button
        onClick={() => modalRef.current?.share({ id: 1, name: 'btn1' }, 'add')}
      >
        add
      </Button>
      <Button onClick={() => modalRef.current?.share({ id: 2, name: 'btn2' })}>
        update
      </Button>
      <FormModal ref={modalRef} schema={schema} trigger={null} />
    </Flex>
  );
};

export default HomePage;
