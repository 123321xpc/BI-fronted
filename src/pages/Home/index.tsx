import { MyFlex } from '@/components/MyFlex';
import { useAllSearchParams } from '@/hooks/useAllSearchParams';

const HomePage: React.FC = () => {
  useAllSearchParams();

  return <MyFlex></MyFlex>;
};

export default HomePage;
