import axios from 'axios';
import styles from './index.less';

const HomePage: React.FC = () => {
  const res = axios.get('http://localhost:8080/api', {
    params: {
      id: ['1', '2', '3'],
    },
  });

  return <div className={styles.container}>121212</div>;
};

export default HomePage;
