// src/api/message_board_api.ts
import { request } from '../utils/request';

export interface MessageBoard {
    id?: number;
    parentId?: number;
    userId?: number;
    commenterName?: string;
    avatarUrl?: string;
    commentContent: string;
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

// 获取留言列表
export const getMessageBoardList = (params?: { page?: number; size?: number; commenterName?: string; status?: number }) => {
    return request<MessageBoard[]>({
        url: '/api/message-board',
        method: 'GET',
        params,
    });
};

// 根据 id 获取留言详情
export const getMessageBoardById = (id: number) => {
    return request<MessageBoard>({
        url: `/api/message-board/${id}`,
        method: 'GET',
    });
};

// 新增留言
export const createMessageBoard = (data: MessageBoard) => {
    return request<void>({
        url: '/api/message-board',
        method: 'POST',
        data,
    });
};

// 修改留言
export const updateMessageBoard = (id: number, data: Partial<MessageBoard>) => {
    return request<void>({
        url: `/api/message-board/${id}`,
        method: 'PUT',
        data,
    });
};

// 删除留言
export const deleteMessageBoard = (id: number) => {
    return request<void>({
        url: `/api/message-board/${id}`,
        method: 'DELETE',
    });
};