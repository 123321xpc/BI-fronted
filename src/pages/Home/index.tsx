import { MyFlex } from '@/components/MyFlex';
import { getLoginUserUsingGet } from '@/service/api/userController';

const HomePage: React.FC = () => {
  getLoginUserUsingGet().then((res) => {
    console.log(res);
  });
  return <MyFlex></MyFlex>;
};

export default HomePage;
