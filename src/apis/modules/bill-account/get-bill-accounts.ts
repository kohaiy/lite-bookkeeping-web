/**
 * title     : 获取账单账户列表
 * path      : /bill-accounts
 * created at: 2022/1/3 下午9:16:28
 * updated at: 2022/3/7 下午11:28:43
 */
import ApiClient from '../../api-client';
export interface GetBillAccountsResp {
    id: number;
    billAccountTypeCode: number;
    name: string;
    amount: number;
    remarks?: string;
}

export default function getBillAccounts() {
    return ApiClient.httpGet<GetBillAccountsResp[]>('/bill-accounts', {  });
};