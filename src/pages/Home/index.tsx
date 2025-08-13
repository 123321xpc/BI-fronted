import Flex from '@/components/Flex';
import FormModal from '@/components/FormModal';

const HomePage: React.FC = () => {
  const schema = {
    name: {},
    id: {},
  };

  return (
    <Flex vertical>
      <FormModal schema={schema} />
    </Flex>
  );
};

export default HomePage;
