/**
 * title     : 添加标签
 * path      : /bill-tag
 * created at: 2022/3/8 上午12:16:25
 * updated at: 2022/3/8 上午12:23:08
 */
import ApiClient from '../../api-client';
export interface PostBillTagBody {
    billTypeCode: number;
    name: string;
    icon: string;
}

export default function postBillTag(body: PostBillTagBody) {
    return ApiClient.httpPost<number>('/bill-tag', { body });
};