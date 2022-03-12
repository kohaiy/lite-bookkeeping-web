/**
 * title     : 添加记账记录
 * path      : /bill
 * created at: 2022/1/4 下午8:50:31
 * updated at: 2022/3/7 下午11:29:38
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

export default function postBill(body: PostBillBody) {
    return ApiClient.httpPost<number>('/bill', { body });
};