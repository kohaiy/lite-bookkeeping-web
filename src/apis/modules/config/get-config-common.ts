/**
 * title     : 获取公共配置
 * path      : /config/common
 * created at: 2022/3/5 下午3:52:22
 * updated at: 2022/3/7 下午11:30:23
 */
import ApiClient from '../../api-client';
export interface GetConfigCommonResp {
    uniAuthClientId: string;
    uniAuthUrl: string;
}

export default function getConfigCommon() {
    return ApiClient.httpGet<GetConfigCommonResp>('/config/common', {  });
};