/**
 * title     : 获取账单标签列表
 * path      : /bill-tags
 * created at: 2022/1/3 下午9:17:03
 * updated at: 2022/1/4 下午10:13:16
 */
import ApiClient from '../../api-client';
export interface GetBillTagsRespDatum {
    id: number;
    billTypeCode: number;
    name: string;
    icon?: string;
}
export interface GetBillTagsResp {
    code: number;
    data: GetBillTagsRespDatum[];
    message: string;
}

export default function getBillTags() {
    return ApiClient.httpGet<GetBillTagsResp>('/bill-tags', {  });
};