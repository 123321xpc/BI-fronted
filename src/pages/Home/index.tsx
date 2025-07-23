import QuickForm from '@/components/QuickForm';
import { useAllSearchParams } from '@/hooks/useAllSearchParams';

const HomePage: React.FC = () => {
  useAllSearchParams();

  return (
    <QuickForm
      columns={2}
      onFinish={async (values) => {
        console.log('表单提交值', values);
      }}
      schema={{
        name: {
          label: '姓名',
          type: 'input',
          rules: [{ required: true }],
        },
        age: {
          label: '年龄',
          type: 'number',
        },
        desc: {
          label: '简介',
          type: 'textarea',
        },
      }}
    />
  );
};

export default HomePage;
