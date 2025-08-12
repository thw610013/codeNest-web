// src/api/featured_content_api.ts
import { request } from '../utils/request';

export interface FeaturedContent {
    id?: number;
    name: string;
    image: string;
    description: string;
    content: string;
    type: 'tool' | 'website' | 'article';  // 英文枚举类型
    createdAt?: string;
    updatedAt?: string;
    linkUrl: string;
}

// 获取精选内容列表
export const getFeaturedContentList = (params?: { page?: number; size?: number; name?: string; type?: string }) => {
    return request<FeaturedContent[]>({
        url: '/api/featured-contents',
        method: 'GET',
        params,
    });
};

// 根据 id 获取精选内容详情
export const getFeaturedContentById = (id: number) => {
    return request<FeaturedContent>({
        url: `/api/featured-contents/${id}`,
        method: 'GET',
    });
};

// 新增精选内容
export const createFeaturedContent = (data: FeaturedContent) => {
    return request<void>({
        url: '/api/featured-contents',
        method: 'POST',
        data,
    });
};

// 修改精选内容
export const updateFeaturedContent = (id: number, data: Partial<FeaturedContent>) => {
    return request<void>({
        url: `/api/featured-contents/${id}`,
        method: 'PUT',
        data,
    });
};

// 删除精选内容
export const deleteFeaturedContent = (id: number) => {
    return request<void>({
        url: `/api/featured-contents/${id}`,
        method: 'DELETE',
    });
};