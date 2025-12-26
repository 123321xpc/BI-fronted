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
