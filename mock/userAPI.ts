import Mock from 'mockjs';

export default {
  'POST /user/login': (req: any, res: any) => {
    res.json({
      code: 0,
      data: Mock.mock({
        userName: '@name',
        userAvatar: 'https://vip.123pan.cn/1828962653/9441995',
        id: Mock.Random.increment(),
      }),
      message: 'success',
    });
  },
};
