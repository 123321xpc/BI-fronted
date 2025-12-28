import { listChartVoByPage } from '@/api/tubiaoxiangguanjiekou';
import ChartCard from '@/components/chart-card';
import { useModel } from '@umijs/max';
import { Flex, message } from 'antd';
import { useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE, RESULT_CODE } from '../../../config';
import styles from './index.less';

const Page = () => {
  const [chartList, setChartList] = useState<API.ChartVO[]>([]);
  const { user } = useModel('user');

  useEffect(() => {
    listChartVoByPage({
      current: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    }).then((res) => {
      if (res.code === RESULT_CODE.SUCCESS) {
        setChartList(res.data?.records || []);
        message.success('获取成功');
      }
    });
  }, []);

  return (
    <Flex gap={45} wrap className={styles.container}>
      {chartList.map((chart) => {
        return <ChartCard chart={chart} key={chart.id} />;
      })}
    </Flex>
  );
};

export default Page;
