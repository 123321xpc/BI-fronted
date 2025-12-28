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
        component: './home',
      },
      {
        name: '我的图表',
        path: '/my-charts',
        component: './my-charts',
      },
    ],
  },
  {
    path: '/user/login',
    layout: false,
    component: './login',
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
