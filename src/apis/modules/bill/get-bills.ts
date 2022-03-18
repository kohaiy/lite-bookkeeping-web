/**
 * title     : 获取记账记录
 * path      : /bills
 * created at: 2022/2/5 下午9:43:06
 * updated at: 2022/3/18 下午9:18:41
 */
import ApiClient from '../../api-client';
export interface GetBillsQuery {
    startDate?: Date;
    endDate?: Date;
}
export interface GetBillsResp {
    id: number;
    amount: number;
    actionTime: string;
    billTypeCode: number;
    billAccountId: number;
    billAccountName: string;
    billTagId: number;
    billTagName: string;
    isIgnore: boolean;
    remarks?: string;
}

export default function getBills(query?: GetBillsQuery) {
    return ApiClient.httpGet<GetBillsResp[]>('/bills', { query });
};