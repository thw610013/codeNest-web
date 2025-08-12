// src/api/tools_api.ts
import { request } from '../utils/request';

export interface ToolInfo {
    id?: number;
    name: string;
    imageUrl?: string;
    description?: string;
    content?: string;
    redirectUrl?: string;
    version?: string;
    usageCount?: number;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
    status?: number;
    tags?: string;
}

// 获取工具列表，支持分页和筛选参数
export const getToolList = (params?: { page?: number; size?: number; name?: string; tags?: string }) => {
    return request<ToolInfo[]>({
        url: '/api/tools',
        method: 'GET',
        params,
    });
};

// 根据 id 获取工具详情
export const getToolById = (id: number) => {
    return request<ToolInfo>({
        url: `/api/tools/${id}`,
        method: 'GET',
    });
};

// 新增工具
export const createTool = (data: ToolInfo) => {
    return request<void>({
        url: '/api/tools',
        method: 'POST',
        data,
    });
};

// 修改工具
export const updateTool = (id: number, data: Partial<ToolInfo>) => {
    return request<void>({
        url: `/api/tools/${id}`,
        method: 'PUT',
        data,
    });
};

// 删除工具
export const deleteTool = (id: number) => {
    return request<void>({
        url: `/api/tools/${id}`,
        method: 'DELETE',
    });
};