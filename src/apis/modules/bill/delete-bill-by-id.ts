/**
 * title     : 删除记账记录
 * path      : /bill/{id}
 * created at: 2022/3/19 下午1:04:21
 * updated at: 2022/3/19 下午1:05:08
 */
import ApiClient from '../../api-client';

export default function deleteBillById(id: number) {
    return ApiClient.httpDelete<number>('/bill/{id}', { params: { id } });
};