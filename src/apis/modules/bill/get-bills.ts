/**
 * title     : 获取记账记录
 * path      : /bills
 * created at: 2022/2/5 下午9:43:06
 * updated at: 2022/2/5 下午9:43:32
 */
import ApiClient from '../../api-client';
export interface GetBillsRespDatum {
    id: number;
    amount: number;
    actionTime: string;
    billTypeCode: number;
    billAccountId: number;
    billAccountName: string;
    billTagId: number;
    billTagName: string;
    remarks?: string;
    isIgnore: boolean;
}
export interface GetBillsResp {
    code: number;
    data: GetBillsRespDatum[];
    message: string;
}

export default function getBills() {
    return ApiClient.httpGet<GetBillsResp>('/bills', {  });
};