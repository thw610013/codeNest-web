// src/api/adminApi/admin_articleManage_api.ts
import { request } from '../../utils/admin_request';

export interface Article {
    id?: number;
    title: string;
    content: string;
    author?: string;
    createdAt?: string;
    updatedAt?: string;
    likes?: number;
    views?: number;
    status?: number;
    summary?: string;
    tags?: string;
}

// 获取文章列表
export const getArticleList = (params?: { page?: number; size?: number; title?: string; author?: string }) => {
    return request<Article[]>({
        url: '/api/articles',
        method: 'GET',
        params,
    });
};

// 多条搜索用
export interface ArticleSearchParams {
    title?: string;
    content?: string;
    tag?: string;
    startDate?: string;
    endDate?: string;
    page?: number;   // 页码，从1开始
    size?: number;   // 每页条数
}

// 分页返回结构
export interface PageResult<T> {
    records: T[];       // 当前页数据
    total: number;      // 总条数
    size: number;       // 每页条数
    current: number;    // 当前页码
}

// 根据 id 获取文章详情
export const getArticleById = (id: number) => {
    return request<Article>({
        url: `/api/articles/${id}`,
        method: 'GET',
    });
};

// 新增文章
export const createArticle = (data: Article) => {
    return request<void>({
        url: '/api/admin/article-manage',
        method: 'POST',
        data,
    });
};

// 修改文章
export const updateArticle = (id: number, data: Partial<Article>) => {
    return request<void>({
        url: `/api/admin/article-manage/${id}`,
        method: 'PUT',
        data,
    });
};

// 删除文章
export const deleteArticle = (id: number) => {
    return request<void>({
        url: `/api/admin/article-manage/${id}`,
        method: 'DELETE',
    });
};

// 多条件分页搜索文章
export const searchArticles = (data: ArticleSearchParams) => {
    return request<Article[]>({
        url: '/api/articles/search',
        method: 'POST',
        data,
    });
};

// 获取文章标签
export const getArticleTags = () => {
    return request<Record<string, string>>({
        url: '/api/admin/article-manage/tags',
        method: 'GET',
    });
};