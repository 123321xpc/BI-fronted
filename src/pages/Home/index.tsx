import { getChartByAi } from '@/api/tubiaoxiangguanjiekou';
import Flex from '@/components/flex';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { ProFormInstance } from '@ant-design/pro-components/lib';
import { useRef } from 'react';

const options = [
  {
    label: '柱状图',
    value: '柱状图',
  },
  {
    label: '折线图',
    value: '折线图',
  },
  {
    label: '饼图',
    value: '饼图',
  },
  {
    label: '散点图',
    value: '散点图',
  },
];

const HomePage: React.FC = () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();

  // const handleSubmit = async (form) => {
  //   const { file, ...rest } = form as any;
  //   const res = await getChartByAi(rest, file[0]);
  //   console.log(res);
  // };

  const handleSubmit = async (formData: any) => {
    try {
      // 1. 创建FormData对象（关键：multipart请求必须用FormData）
      const form = new FormData();

      // 2. 处理文件：ProFormUploadButton返回的是文件数组，取第一个
      if (formData.file && formData.file.length > 0) {
        form.append('file', formData.file[0].originFileObj); // 注意取originFileObj（antd upload的原生文件对象）
      }

      // 3. 处理表单参数（对应后端的GenChartRequest）
      form.append('goal', formData.goal || '');
      form.append('chartType', formData.chartType || '');
      // 如果有name参数可以补充：form.append('name', formData.name || '');

      // 4. 调用接口：直接传递FormData
      const res = await getChartByAi(form);
      console.log('接口返回:', res);
    } catch (error) {
      console.error('提交失败:', error);
    }
  };

  return (
    <Flex className={' w-full'}>
      <Flex className={'left flex-1'}>
        <ProForm<{
          name?: string;
          goal: string;
          chartType: string;
        }>
          onFinish={handleSubmit as any}
          formRef={formRef}
          autoFocusFirstInput
        >
          <ProFormText name="goal" label="分析目标" />
          <ProFormUploadButton
            name="file"
            label="上传数据文件（仅支持excel文件）"
          />
          <ProFormSelect name="chartType" label="图表类型" options={options} />
        </ProForm>
      </Flex>
      <Flex className={'right flex-1'}>1111</Flex>
    </Flex>
  );
};

export default HomePage;
