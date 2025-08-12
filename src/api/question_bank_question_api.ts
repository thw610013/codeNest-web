// src/api/question_bank_question_api.ts
import { request } from '../utils/request';

export interface QuestionBankQuestion {
    id?: number;
    questionBankId: number; // 题库ID
    questionId: number;     // 题目ID
    sortOrder?: number;     // 排序
    status?: number;        // 状态，1=启用，0=禁用
    createdBy?: string;     // 创建人
    createdAt?: string;     // 创建时间
    updatedAt?: string;     // 更新时间
    remarks?: string;       // 备注
}

// 获取题库与题目关联列表
export const getQuestionBankQuestionList = (params?: {
    page?: number;
    size?: number;
    questionBankId?: number;
    questionId?: number
}) => {
    return request<QuestionBankQuestion[]>({
        url: '/api/question-bank-questions',
        method: 'GET',
        params,
    });
};

// 根据ID获取关联详情
export const getQuestionBankQuestionById = (id: number) => {
    return request<QuestionBankQuestion>({
        url: `/api/question-bank-questions/${id}`,
        method: 'GET',
    });
};

// 新增关联
export const createQuestionBankQuestion = (data: QuestionBankQuestion) => {
    return request<void>({
        url: '/api/question-bank-questions',
        method: 'POST',
        data,
    });
};

// 修改关联
export const updateQuestionBankQuestion = (id: number, data: Partial<QuestionBankQuestion>) => {
    return request<void>({
        url: `/api/question-bank-questions/${id}`,
        method: 'PUT',
        data,
    });
};

// 删除关联
export const deleteQuestionBankQuestion = (id: number) => {
    return request<void>({
        url: `/api/question-bank-questions/${id}`,
        method: 'DELETE',
    });
};

// 根据题库ID获取题库下的题目列表
export const getQuestionsByBankId = (questionBankId: number) => {
    return request<QuestionBankQuestion[]>({
        url: `/api/question-bank-questions/questions/${questionBankId}`,
        method: 'GET',
    });
};