/**
 * title     : 注册用户
 * path      : /user/register
 * created at: 2021/9/15 下午11:03:11
 * updated at: 2022/1/4 下午10:32:15
 */
import ApiClient from '../../api-client';
export interface PostUserRegisterBody {
    name: string;
    password: string;
}
export interface PostUserRegisterRespData {
    id: number;
}
export interface PostUserRegisterResp {
    code: number;
    data: PostUserRegisterRespData;
    message: string;
}

export default function postUserRegister(body: PostUserRegisterBody) {
    return ApiClient.httpPost<PostUserRegisterResp>('/user/register', { body });
};