import { userLoginUsingPost } from '@/api/userController';
import { useModel, useNavigate } from '@@/exports';
import { useRequest } from '@@/plugin-request';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Tabs, theme } from 'antd';
import { LOGO_URL, SYSTEM_NAME } from '../../../config';
import styles from './index.less';

export default () => {
  const { token } = theme.useToken();
  const { updateUser } = useModel('user');
  const nav = useNavigate();

  const { run: handleLogin } = useRequest(
    (params: API.UserLoginRequest) => userLoginUsingPost(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (res) {
          updateUser(res as any);
          nav('/home');
        }
      },
    },
  );

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: token.colorBgContainer }}
    >
      <LoginForm<API.UserLoginRequest>
        logo={LOGO_URL}
        title={SYSTEM_NAME}
        onFinish={handleLogin as any}
      >
        <Tabs centered>
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
        </Tabs>
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'用户名: admin'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'密码: admin'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginForm>
    </div>
  );
};
