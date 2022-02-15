/**
 * title     : 获取用户信息
 * path      : /user/info
 * created at: 2022/2/15 下午8:10:20
 * updated at: 2022/2/15 下午8:11:13
 */
import ApiClient from '../../api-client';
export interface GetUserInfoRespData {
    email: string;
    id: number;
    mobile: string;
    name: string;
}
export interface GetUserInfoResp {
    code: number;
    data: GetUserInfoRespData;
    message: string;
}

export default function getUserInfo() {
    return ApiClient.httpGet<GetUserInfoResp>('/user/info', {  });
};