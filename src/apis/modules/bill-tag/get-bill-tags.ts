/**
 * title     : 获取账单标签列表
 * path      : /bill-tags
 * created at: 2022/1/3 下午9:17:03
 * updated at: 2022/3/7 下午11:29:09
 */
import ApiClient from '../../api-client';
export interface GetBillTagsResp {
    id: number;
    billTypeCode: number;
    name: string;
    icon?: string;
}

export default function getBillTags() {
    return ApiClient.httpGet<GetBillTagsResp[]>('/bill-tags', {  });
};