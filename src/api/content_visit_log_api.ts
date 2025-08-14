// src/api/content_visit_log_api.ts
import { request } from '../utils/request';

export interface ContentVisitLog {
    id?: number;
    visitDate: string;       // 日期，格式 YYYY-MM-DD
    ipAddress?: string;      // 访客 IP
    userAgent?: string;      // 浏览器/设备信息
    createdAt?: string;      // 访问时间
    articleId?: number;      // 访问的文章ID
    questionBankId?: number; // 访问的题库ID
    questionId?: number;     // 访问的题目ID
}

// 根据文章 ID 查询访问记录
export const getVisitLogsByArticleId = (articleId: number) => {
    return request<ContentVisitLog[]>({
        url: `/api/content-visit-logs/article/${articleId}`,
        method: 'GET',
    });
};

// 根据题库 ID 查询访问记录
export const getVisitLogsByQuestionBankId = (questionBankId: number) => {
    return request<ContentVisitLog[]>({
        url: `/api/content-visit-logs/question-bank/${questionBankId}`,
        method: 'GET',
    });
};

// 根据题目 ID 查询访问记录
export const getVisitLogsByQuestionId = (questionId: number) => {
    return request<ContentVisitLog[]>({
        url: `/api/content-visit-logs/question/${questionId}`,
        method: 'GET',
    });
};

// 新增访问记录（访问页面时插入）
export const createContentVisitLog = (data: ContentVisitLog) => {
    return request<void>({
        url: '/api/content-visit-logs',
        method: 'POST',
        data,
    });
};