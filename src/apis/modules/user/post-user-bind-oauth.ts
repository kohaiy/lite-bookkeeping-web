/**
 * title     : 绑定uniauth
 * path      : /user/bind/oauth
 * created at: 2022/3/22 下午10:10:24
 * updated at: 2022/3/22 下午10:15:09
 */
import ApiClient from '../../api-client';
export interface PostUserBindOauthBody {
    type: number;
    code: string;
    name: string;
    password: string;
}
export interface PostUserBindOauthResp {
    id: number;
    name: string;
    token: string;
}

export default function postUserBindOauth(body: PostUserBindOauthBody) {
    return ApiClient.httpPost<PostUserBindOauthResp>('/user/bind/oauth', { body });
};