// src/api/adminApi/admin_messageManage_api.ts
import { request } from '../../utils/admin_request';

export interface MessageBoard {
    id?: number;
    parentId?: number;
    userId?: number;
    commenterName?: string;
    avatarUrl?: string;
    commentContent?: string;
    commentTime?: string;
    isDeleted?: number;
    likeCount?: number;
    status?: number;
    commentSource?: string;
    ipAddress?: string;
    location?: string;
    userAgent?: string;
    createdAt?: string;
    updatedAt?: string;
}

// 获取留言列表（管理员接口。获取所所有留言）
export const getMessageBoardList = (params?: { page?: number; size?: number; commenterName?: string; status?: number }) => {
    return request<MessageBoard[]>({
        url: '/api/admin/message-board',
        method: 'GET',
        params,
    });
};

// 根据 id 获取留言详情
export const getMessageBoardById = (id: number) => {
    return request<MessageBoard>({
        url: `/api/admin/message-board/${id}`,
        method: 'GET',
    });
};

// 修改留言
export const updateMessageBoard = (data: MessageBoard) => {
    return request<boolean>({
        url: '/api/admin/message-board',
        method: 'PUT',
        data,
    });
};

// 删除留言
export const deleteMessageBoard = (id: number) => {
    return request<void>({
        url: `/api/admin/message-board/${id}`,
        method: 'DELETE',
    });
};

