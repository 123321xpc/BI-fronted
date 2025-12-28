import { getChartByAi } from '@/api/tubiaoxiangguanjiekou';
import Flex from '@/components/flex';
import {
  ProForm,
  ProFormSelect,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { ProFormInstance } from '@ant-design/pro-components/lib';
import { Card, message, Spin, UploadFile } from 'antd';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React, { useRef, useState } from 'react';
import { RESULT_CODE } from '../../../config';
import styles from './index.less';

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

type FormDataType = {
  goal: string;
  chartType: string;
  file: UploadFile[];
  name?: string;
};

const HomePage: React.FC = () => {
  const formRef = useRef<ProFormInstance<FormDataType>>();
  const [loading, setLoading] = useState(false);
  const [chartOption, setChartOption] = useState<EChartsOption>();
  const [chartRes, setChartRes] = useState<string>();

  const handleSubmit = async (values: FormDataType) => {
    try {
      console.log('表单数据:', values);

      // 1. 校验文件
      if (!values.file || values.file.length === 0) {
        message.error('请上传数据文件!');
        return;
      }

      // 2. 创建 FormData
      const form = new FormData();
      form.append('goal', values.goal || '');
      form.append('chartType', values.chartType || '');
      form.append('file', values.file[0].originFileObj as any);

      setLoading(true);
      setChartOption(undefined);
      const res = await getChartByAi({} as any, form);

      if (res.code === RESULT_CODE.SUCCESS) {
        setChartRes(res.data?.genResult);
        if (res.data?.genChart) {
          try {
            const chartOption = JSON.parse(res.data.genChart);
            setChartOption(chartOption);
          } catch (error) {
            console.error('解析图表配置失败:', error);
            message.error('图表配置解析失败');
          }
        }
      } else {
        message.error(res.message || '生成图表失败');
      }
    } catch (error) {
      console.error('提交失败:', error);
      message.error('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex className="w-full" style={{ alignItems: 'stretch' }}>
      <Card className={styles.left}>
        <ProForm<FormDataType>
          submitter={{
            searchConfig: {
              submitText: `${loading ? '正在分析' : '开始分析'}`,
            },
            resetButtonProps: false,
            // 可以自定义提交按钮样式
            submitButtonProps: {
              type: 'primary',
              loading,
              size: 'large',
            },
          }}
          onFinish={handleSubmit}
          formRef={formRef}
          autoFocusFirstInput
        >
          <ProFormTextArea
            required
            name="goal"
            label="分析目标"
            placeholder="请输入您的分析目标，例如：分析销售额趋势"
            rules={[
              { required: true, message: '请输入分析目标' },
              { min: 2, message: '分析目标至少2个字符' },
            ]}
          />

          <ProFormUploadButton
            required
            name="file"
            label="上传数据文件"
            tooltip="仅支持Excel文件（.xlsx, .xls）"
            rules={[
              {
                required: true,
                message: '请上传数据文件',
              },
            ]}
            max={1}
            accept=".xlsx,.xls"
          />

          <ProFormSelect
            name="chartType"
            label="图表类型"
            placeholder="请选择图表类型（可选）"
            tooltip="可选择生成的图表类型，若不选择，则由系统自动选择合适的图表"
            options={options}
          />
        </ProForm>
      </Card>

      <Card className={styles.right}>
        <Spin spinning={loading} size={'large'} tip="正在分析数据，请稍候...">
          {!chartOption && !loading && (
            <div className="text-center py-8">
              <h1 className="text-lg font-medium text-gray-400 mb-4">
                请填写分析目标并上传数据文件
              </h1>
              <p className="text-gray-500">
                点击左侧表单中的"开始分析"按钮生成图表
              </p>
            </div>
          )}

          {chartRes && (
            <div
              className="font-medium text-lg w-[90%] mb-4 p-4 bg-blue-50 rounded"
              style={{ textIndent: '2rem' }}
            >
              {chartRes}
            </div>
          )}

          {chartOption && (
            <ReactECharts
              className="h-[400px] w-full"
              option={chartOption}
              opts={{ renderer: 'svg' }}
            />
          )}
        </Spin>
      </Card>
    </Flex>
  );
};

export default HomePage;
