/**
 * title     : 第三方登录
 * path      : /user/login/oauth
 * created at: 2022/3/5 下午7:13:33
 * updated at: 2022/3/7 下午11:27:26
 */
import ApiClient from '../../api-client';
export interface PostUserLoginOauthBody {
    type: string;
    code: string;
}
export interface PostUserLoginOauthResp {
    isBind: boolean;
    token?: string;
}

export default function postUserLoginOauth(body: PostUserLoginOauthBody) {
    return ApiClient.httpPost<PostUserLoginOauthResp>('/user/login/oauth', { body });
};