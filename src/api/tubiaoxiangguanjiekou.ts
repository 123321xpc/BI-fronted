// @ts-ignore
/* eslint-disable */
import request from '../../config/request';

/** 创建图表 POST /chart/add */
export async function addChart(
  body: API.ChartAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/chart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除图表 POST /chart/delete */
export async function deleteChart(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/chart/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑图表（给用户使用） POST /chart/edit */
export async function editChart(
  body: API.ChartEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/chart/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/generate */
export async function getChartByAi(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartByAIParams,
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChartVO>('/chart/generate', {
    method: 'POST',
    params: {
      ...params,
      genChartRequest: undefined,
      ...params['genChartRequest'],
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取图表（封装类） GET /chart/get/vo */
export async function getChartVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChartVO>('/chart/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取图表列表（仅管理员可用） POST /chart/list/page */
export async function listChartByPage(
  body: API.ChartQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChart>('/chart/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取图表列表（封装类） POST /chart/list/page/vo */
export async function listChartVoByPage(
  body: API.ChartQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChartVO>('/chart/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取当前登录用户创建的图表列表 POST /chart/my/list/page/vo */
export async function listMyChartVoByPage(
  body: API.ChartQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChartVO>('/chart/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新图表（仅管理员可用） POST /chart/update */
export async function updateChart(
  body: API.ChartUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/chart/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
