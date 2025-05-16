// 全局共享数据示例

import { useLocalStorageState } from 'ahooks';

const initialState: API.LoginUserVO = {
  userName: '未登录',
};

const user = () => {
  const [user, setUser] = useLocalStorageState('user', {
    defaultValue: initialState,
  });

  const updateUser = (newUser: API.LoginUserVO) => {
    setUser({ ...newUser, ...newUser });
  };

  const removeUser = () => {
    setUser(initialState);
  };

  return { user, updateUser, removeUser };
};

export default user;
