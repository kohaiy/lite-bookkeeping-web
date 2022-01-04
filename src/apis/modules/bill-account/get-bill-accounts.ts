/**
 * title     : 获取账单账户列表
 * path      : /bill-accounts
 * created at: 2022/1/3 下午9:16:28
 * updated at: 2022/1/4 下午10:13:24
 */
import ApiClient from '../../api-client';
export interface GetBillAccountsRespDatum {
    id: number;
    billAccountTypeCode: number;
    name: string;
    amount: number;
    remarks?: string;
}
export interface GetBillAccountsResp {
    code: number;
    data: GetBillAccountsRespDatum[];
    message: string;
}

export default function getBillAccounts() {
    return ApiClient.httpGet<GetBillAccountsResp>('/bill-accounts', {  });
};