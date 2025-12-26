declare namespace API {
  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChartVO = {
    code?: number;
    data?: ChartVO;
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageChart = {
    code?: number;
    data?: PageChart;
    message?: string;
  };

  type BaseResponsePageChartVO = {
    code?: number;
    data?: PageChartVO;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type Chart = {
    /** id */
    id: number;
    /** 分析目标 */
    goal: string;
    /** 图表数据 */
    chartData: string;
    /** 图表名 */
    name: string;
    /** 图表类型 */
    chartType: string;
    /** 生成的图表数据 */
    genChart: string;
    /** 生成的分析结论 */
    genResult: string;
    /** 创建用户 id */
    userId: number;
    /** 创建时间 */
    createTime: string;
    /** 更新时间 */
    updateTime: string;
    /** 是否删除 */
    isDelete: number;
  };

  type ChartAddRequest = {
    /** 分析目标 */
    goal: string;
    /** 图表数据 */
    chartData: string;
    /** 图表类型 */
    chartType: string;
    /** 图表名 */
    name: string;
  };

  type ChartEditRequest = {
    /** id */
    id?: number;
    /** 分析目标 */
    goal?: string;
    /** 图表数据 */
    chartData?: string;
    /** 图表类型 */
    chartType?: string;
    /** 图表名 */
    name?: string;
  };

  type ChartQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    /** id */
    id?: number;
    /** 分析目标 */
    goal?: string;
    /** 图表类型 */
    chartType?: string;
    /** 搜索关键字 */
    searchText?: string;
    /** 创建用户 id */
    userId?: number;
    /** 图表名 */
    name?: string;
  };

  type ChartUpdateRequest = {
    /** id */
    id?: number;
    /** 图表名 */
    name?: string;
    /** 分析目标 */
    goal?: string;
    /** 图表数据 */
    chartData?: string;
    /** 图表类型 */
    chartType?: string;
    /** 生成的图表数据 */
    genChart?: string;
    /** 生成的分析结论 */
    genResult?: string;
  };

  type ChartVO = {
    /** id */
    id?: number;
    /** 分析目标 */
    goal?: string;
    /** 图表名 */
    name?: string;
    /** 图表数据 */
    chartData?: string;
    /** 图表类型 */
    chartType?: string;
    /** 生成的图表数据 */
    genChart?: string;
    /** 生成的分析结论 */
    genResult?: string;
    /** 创建用户 id */
    userId?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type GenChartRequest = {
    /** 分析目标 */
    goal: string;
    /** 图表类型 */
    chartType: string;
    /** 图表名 */
    name: string;
  };

  type getChartByAIParams = {
    genChartRequest: GenChartRequest;
  };

  type getChartVOByIdParams = {
    id: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type LoginUserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageChart = {
    records?: Chart[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageChartVO = {
    records?: ChartVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type uploadFileParams = {
    uploadFileRequest: UploadFileRequest;
  };

  type UploadFileRequest = {
    biz?: string;
  };

  type User = {
    /** id */
    id: number;
    /** 账号 */
    userAccount: string;
    /** 密码 */
    userPassword: string;
    /** 用户昵称 */
    userName: string;
    /** 用户头像 */
    userAvatar: string;
    /** 用户简介 */
    userProfile: string;
    /** 用户角色：user/admin/ban */
    userRole: string;
    /** 编辑时间 */
    editTime: string;
    /** 创建时间 */
    createTime: string;
    /** 更新时间 */
    updateTime: string;
    /** 是否删除 */
    isDelete: number;
  };

  type UserAddRequest = {
    /** 昵称 */
    userName?: string;
    /** 账号 */
    userAccount?: string;
    /** 头像 */
    userAvatar?: string;
    /** 权限 */
    userRole?: string;
  };

  type UserLoginRequest = {
    /** 用户账号 */
    userAccount?: string;
    /** 用户密码 */
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    /** 昵称 */
    userName?: string;
    /** 介绍 */
    userProfile?: string;
    /** 权限 */
    userRole?: string;
  };

  type UserRegisterRequest = {
    /** 用户账号 */
    userAccount?: string;
    /** 用户密码 */
    userPassword?: string;
    /** 确认密码 */
    checkPassword?: string;
  };

  type UserUpdateMyRequest = {
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
  };

  type UserUpdateRequest = {
    /** id */
    id?: number;
    /** 用户名 */
    userName?: string;
    /** 账号 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 权限 */
    userRole?: string;
  };

  type UserVO = {
    /** Id */
    id: number;
    /** 昵称 */
    userName: string;
    /** 头像 */
    userAvatar: string;
    /** 介绍 */
    userProfile: string;
    /** 权限 */
    userRole: string;
    /** 创建时间 */
    createTime: string;
  };
}
