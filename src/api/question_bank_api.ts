import { request } from '../utils/request';

export interface QuestionBank {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    tags: string;
}

// 定义分页返回的泛型接口
export interface PageResult<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
    pages: number;
}
// 获取题库列表（）
export const getQuestionBankList = (params?: { tags?: string; page?: number; size?: number }) => {
    return request<PageResult<QuestionBank>>({
        url: '/api/question-banks',
        method: 'GET',
        params,
    });
};

// 获取单个题库详情
export const getQuestionBankById = (id: number) => {
    return request<QuestionBank>({
        url: `/api/question-banks/${id}`,
        method: 'GET',
    });
};

// 新增题库
export const createQuestionBank = (data: QuestionBank) => {
    return request<void>({
        url: '/question-banks',
        method: 'POST',
        data,
    });
};

// 更新题库
export const updateQuestionBank = (id: number, data: Partial<QuestionBank>) => {
    return request<void>({
        url: `/question-banks/${id}`,
        method: 'PUT',
        data,
    });
};

// 删除题库
export const deleteQuestionBank = (id: number) => {
    return request<void>({
        url: `/question-banks/${id}`,
        method: 'DELETE',
    });
};