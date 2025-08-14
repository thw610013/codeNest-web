import { request } from '../utils/request';

export interface LikeRecord {
    id: number;
    userId?: number;
    targetType: '1' | '2' | '3' | '4';
    targetId: number;
    isLike: string;
    createTime: string;
    updateTime: string;
}

// 根据 targetType 查询所有点赞记录
export const getLikesByType = (targetType: string) => {
    return request<LikeRecord[]>({
        url: '/api/like-record/type/' + targetType,
        method: 'GET',
    });
};

// 根据 targetType + targetId 查询点赞记录
export const getLikeByTarget = (targetType: string, targetId: number) => {
    return request<number | null>({
        url: `/api/like-record/${targetType}/${targetId}`,
        method: 'GET',
    });
};

// 根据ID获取点赞记录详情
export const getLikeRecordById = (id: number) => {
    return request<number>({
        url: `/api/like-record/${id}`,
        method: 'GET',
    });
};

// 新增点赞记录
export const createLikeRecord = (record: Partial<LikeRecord>) => {
    return request<boolean>({
        url: '/api/like-record',
        method: 'POST',
        data: record,
    });
};

// 更新点赞记录
export const updateLikeRecord = (id: number, record: Partial<LikeRecord>) => {
    return request<boolean>({
        url: `/api/like-record/${id}`,
        method: 'PUT',
        data: record,
    });
};

// 删除点赞记录
export const deleteLikeRecord = (id: number) => {
    return request<boolean>({
        url: `/api/like-record/${id}`,
        method: 'DELETE',
    });
};