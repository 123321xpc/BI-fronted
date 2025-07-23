import { Outlet, useLocation, useModel, useNavigate } from '@@/exports';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Avatar, Space, Tooltip } from 'antd';
import { useCallback } from 'react';
import { LOGO_URL, SYSTEM_NAME } from '../../../config';
import { routes } from '../../../config/routes';
import styles from './index.less';

export default () => {
  const nav = useNavigate();
  const location = useLocation();
  const { user = {}, removeUser } = useModel('user');

  const handleClick = () => {
    if (!user.id) {
      nav('/user/login');
    } else {
      //  退出登录
      removeUser();
    }
  };

  const getTipContent = useCallback(() => {
    if (!user.id) {
      return '点击登录';
    } else {
      return '点击退出登录';
    }
  }, [user.id]);

  return (
    <ProLayout
      className={styles.container}
      splitMenus
      route={routes[0]}
      logo={LOGO_URL}
      fixedHeader
      title={SYSTEM_NAME}
      location={{
        pathname: location.pathname,
      }}
      token={{
        header: {
          colorBgMenuItemSelected: '#f0f0f0',
        },
      }}
      avatarProps={{
        src: user.userAvatar || 'https://vip.123pan.cn/1828962653/9441991',
        title: user.userName,
        render: (props) => {
          return (
            <Tooltip placement="bottom" title={getTipContent}>
              <Space onClick={handleClick}>
                <Avatar size={30} {...props} />
                <span>{user.userName}</span>
              </Space>
            </Tooltip>
          );
        },
      }}
      menuFooterRender={(props) => {
        if (props?.collapsed) return undefined;
        return (
          <p
            style={{
              textAlign: 'center',
              paddingBlockStart: 12,
            }}
          >
            Power by Ant Design
          </p>
        );
      }}
      onMenuHeaderClick={() => nav('/')}
      menuItemRender={(item, dom) => {
        if (!item.hideInMenu) {
          return (
            <a
              onClick={() => {
                nav(item.path as string);
              }}
            >
              {dom}
            </a>
          );
        }
      }}
      layout="top"
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </ProLayout>
  );
};
