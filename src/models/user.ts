// 全局共享数据示例
import { UserType } from '@/types/user';
import { useState } from 'react';

const initialState: UserType = {
  userName: '未登录',
};

const user = () => {
  const [user, setUser] = useState<UserType>(initialState);

  const updateUser = (newUser: UserType) => {
    setUser({ ...newUser, ...newUser });
  };

  const removeUser = () => {
    setUser(initialState);
  };

  return { user, updateUser, removeUser };
};

export default user;
