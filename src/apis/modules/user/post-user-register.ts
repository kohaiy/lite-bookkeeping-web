/**
 * title     : 注册用户
 * path      : /user/register
 * created at: 2021/9/15 下午11:03:11
 * updated at: 2022/3/7 下午11:27:44
 */
import ApiClient from '../../api-client';
export interface PostUserRegisterBody {
    name: string;
    password: string;
}
export interface PostUserRegisterResp {
    id: number;
}

export default function postUserRegister(body: PostUserRegisterBody) {
    return ApiClient.httpPost<PostUserRegisterResp>('/user/register', { body });
};