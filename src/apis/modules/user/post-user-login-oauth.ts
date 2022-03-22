/**
 * title     : 第三方登录
 * path      : /user/login/oauth
 * created at: 2022/3/5 下午7:13:33
 * updated at: 2022/3/22 下午10:33:19
 */
import ApiClient from '../../api-client';
export interface PostUserLoginOauthBody {
    type: number;
    code: string;
}
export interface PostUserLoginOauthRespData {
    id: number;
    name: string;
    token: string;
}
export interface PostUserLoginOauthResp {
    isBind: boolean;
    data?: PostUserLoginOauthRespData;
}

export default function postUserLoginOauth(body: PostUserLoginOauthBody) {
    return ApiClient.httpPost<PostUserLoginOauthResp>('/user/login/oauth', { body });
};