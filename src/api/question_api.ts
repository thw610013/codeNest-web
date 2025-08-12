import { request } from '../utils/request'; // 你项目的请求封装路径

export interface Question {
    id: number;
    name: string;
    description: string;
    answer: string;
    tags: string | string[];  // 这里允许两种类型
    createdAt: string;
    updatedAt: string;
    viewCount: number;
}
// 分页查询题目，支持按名称和标签模糊搜索
export const getQuestions = (
    page: number = 1,
    size: number = 20,
    name?: string,
    tags?: string
) => {
    return request<{
        records: Question[];
        total: number;
        current: number;
        size: number;
    }>({
        url: '/api/questions',
        method: 'GET',
        params: { page, size, name, tags },
    });
};

// 根据ID获取题目详情
export const getQuestionById = (id: number) => {
    return request<Question>({
        url: `/api/questions/${id}`,
        method: 'GET',
    });
};

// 新增题目
export const createQuestion = (question: Partial<Question>) => {
    return request<boolean>({
        url: '/api/questions',
        method: 'POST',
        data: question,
    });
};

// 更新题目
export const updateQuestion = (id: number, question: Partial<Question>) => {
    return request<boolean>({
        url: `/api/questions/${id}`,
        method: 'PUT',
        data: question,
    });
};

// 删除题目
export const deleteQuestion = (id: number) => {
    return request<boolean>({
        url: `/api/questions/${id}`,
        method: 'DELETE',
    });
};