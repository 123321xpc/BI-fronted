import MyFlex from '@/components/MyFLex';
import { useAllSearchParams } from '@/hooks/useAllSearchParams';

const HomePage: React.FC = () => {
  useAllSearchParams();

  return <MyFlex>Home Page</MyFlex>;
};

export default HomePage;
