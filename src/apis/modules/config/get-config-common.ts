/**
 * title     : 获取公共配置
 * path      : /config/common
 * created at: 2022/3/5 下午3:52:22
 * updated at: 2022/3/5 下午4:26:23
 */
import ApiClient from '../../api-client';
export interface GetConfigCommonRespData {
    uniAuthClientId: string;
    uniAuthUrl: string;
}
export interface GetConfigCommonResp {
    code: number;
    data: GetConfigCommonRespData;
    message?: string;
}

export default function getConfigCommon() {
    return ApiClient.httpGet<GetConfigCommonResp>('/config/common', {  });
};