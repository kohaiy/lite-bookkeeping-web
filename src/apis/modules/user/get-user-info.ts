/**
 * title     : 获取用户信息
 * path      : /user/info
 * created at: 2022/2/15 下午8:10:20
 * updated at: 2022/3/7 下午11:28:11
 */
import ApiClient from '../../api-client';
export interface GetUserInfoResp {
    email: string;
    id: number;
    mobile: string;
    name: string;
}

export default function getUserInfo() {
    return ApiClient.httpGet<GetUserInfoResp>('/user/info', {  });
};