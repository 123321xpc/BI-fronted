import { BASE_URL, RESULT_CODE } from '@/constants';
import { message } from 'antd';
import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    message.error('请求错误，请稍后再试！');
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (res: any) => {
    if (res.data.code === RESULT_CODE.NO_LOGIN) {
      await message.warning('您的登录信息已过期，请先登录！', 1.5);
      window.location.href = '/user/login';
      return Promise.reject(res.data.message);
    }

    if (res.data.code !== RESULT_CODE.SUCCESS) {
      message.error(res.data.message);
      return Promise.reject(res.data.message);
    }

    return res.data;
  },
  (error: AxiosError) => {
    message.error('系统错误，请重试！');
    return Promise.reject(error);
  },
);

// 封装请求方法
const request = <T>(url: string, options: any) => {
  return instance.request<any, T>({
    url,
    ...options,
  });
};

export default request;
