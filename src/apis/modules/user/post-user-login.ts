/**
 * title     : 登录
 * path      : /user/login
 * created at: 2021/9/15 下午11:01:04
 * updated at: 2021/12/13 下午10:37:04
 */
import ApiClient from '../../api-client';
export interface PostUserLoginBody {
    name: string;
    password: string;
}
export interface PostUserLoginRespData {
    email: string;
    id: number;
    mobile: string;
    name: string;
    token: string;
}
export interface PostUserLoginResp {
    code: number;
    data: PostUserLoginRespData;
    message: string;
}

export default function PostUserLogin(body: PostUserLoginBody) {
    return ApiClient.httpPost<PostUserLoginResp>('/user/login', { body });
};