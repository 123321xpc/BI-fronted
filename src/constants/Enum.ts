export const USER_ROLE = {
  USER: 'user',
  ADMIN: 'admin',
};

export const getUserRole = (role: string) => {
  switch (role) {
    case USER_ROLE.USER:
      return '普通用户';
    case USER_ROLE.ADMIN:
      return '管理员';
    default:
      return '未知权限';
  }
};

export const userRoleOptions = Object.entries(USER_ROLE).map(
  ([label, value]) => ({
    label: getUserRole(value),
    value,
  }),
);
