export type UserType = Partial<{
  id: number;
  userName: string;
  userAvatar: string;
  userAccount: string;
  userRole: string;
}>;

export type LoginReq = {
  userAccount: string;
  userPassword: string;
};
