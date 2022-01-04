/**
 * title     : 添加记账记录
 * path      : /bill
 * created at: 2022/1/4 下午8:50:31
 * updated at: 2022/1/4 下午10:13:00
 */
import ApiClient from '../../api-client';
export interface PostBillBody {
    actionTime: string;
    billAccountId: number;
    billTagId: number;
    amount: number;
    remarks?: string;
    isIgnore?: boolean;
}
export interface PostBillResp {
    code: number;
    data: number;
    message: string;
}

export default function postBill(body: PostBillBody) {
    return ApiClient.httpPost<PostBillResp>('/bill', { body });
};