import { LoginReq, UserType } from '@/types/user';
import request from '../../config/request';

export const userLogin = async (params: LoginReq) => {
  return request<UserType>('/user/login', { method: 'POST', data: params });
};
