import {
  userLoginUsingPost,
  userRegisterUsingPost,
} from '@/api/userController';
import { useModel, useNavigate } from '@@/exports';
import { useRequest } from '@@/plugin-request';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs, theme } from 'antd';
import { useMemo, useState } from 'react';
import { LOGO_URL, RESULT_CODE, SYSTEM_NAME } from '../../../config';
import styles from './index.less';

export default () => {
  const { token } = theme.useToken();
  const { updateUser } = useModel('user');
  const nav = useNavigate();
  const [tabKey, setTabKey] = useState<string>('login');

  const isLogin = useMemo(() => tabKey === 'login', [tabKey]);

  const { run: handleSubmit } = useRequest(
    (params: API.UserLoginRequest) => {
      if (isLogin) {
        return userLoginUsingPost(params); // ✅ 返回异步请求
      } else {
        return userRegisterUsingPost(params);
      }
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        if (res && res.code === RESULT_CODE.SUCCESS) {
          updateUser(res as any);
          nav('/home');
        }
      },
      onError: (err: any) => {
        message.error('网络异常，请稍后重试');
        console.error('请求失败：', err);
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
        onFinish={handleSubmit as any}
      >
        <Tabs centered onChange={(tab) => setTabKey(tab)}>
          <Tabs.TabPane key={'login'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'register'} tab={'注册'} />
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
        {!isLogin && (
          <ProFormText.Password
            name="checkPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'确认密码: admin'}
            rules={[
              {
                required: true,
                message: '请再次输入密码！',
              },
              ({ getFieldValue }) => ({
                // 验证两次密码一致
                validator(_, value) {
                  if (!value || getFieldValue('userPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致！'));
                },
              }),
            ]}
          />
        )}
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
