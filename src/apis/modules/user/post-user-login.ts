/**
 * title     : 登录
 * path      : /user/login
 * created at: 2021/9/15 下午11:01:04
 * updated at: 2022/3/7 下午11:26:48
 */
import ApiClient from '../../api-client';
export interface PostUserLoginBody {
    name: string;
    password: string;
}
export interface PostUserLoginResp {
    email?: string;
    id: number;
    mobile?: string;
    name: string;
    token: string;
}

export default function postUserLogin(body: PostUserLoginBody) {
    return ApiClient.httpPost<PostUserLoginResp>('/user/login', { body });
};