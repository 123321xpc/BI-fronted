import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';

type Props = {
  chart: API.ChartVO;
};

const Component = (props: Props) => {
  const { chart } = props;

  return (
    <Card className={'w-[31%]'}>
      <ReactECharts
        className="h-[400px] w-full"
        option={JSON.parse(chart.genChart || '') || {}}
      />
    </Card>
  );
};

export default Component;
