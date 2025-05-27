export const routes: RouteType[] = [
  {
    path: '/',
    layout: false,
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: '首页',
        path: '/home',
        component: './Home',
      },
      {
        name: '用户管理',
        path: '/userAdmin',
        component: './Admin/UserAdmin',
      },
      {
        name: '可编辑表格',
        path: '/EditableTable',
        component: './EditableTable',
      },
      {
        name: 'AI',
        path: '/test',
        component: './Test',
      },
    ],
  },
  {
    path: '/user/login',
    layout: false,
    component: './Login',
  },
];

export type RouteType = Partial<{
  path: string;
  layout: boolean;
  redirect: string;
  name: string;
  icon: React.ReactNode;
  component: string;
  access: boolean;
  hideInMenu: boolean;
  routes: RouteType[];
}>;
