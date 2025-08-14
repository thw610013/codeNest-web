// src/api/site_visit_log_api.ts
import { request } from '../utils/request';

export interface SiteVisitLog {
    id?: number;
    visitDate: string;       // 日期，格式 YYYY-MM-DD
    ipAddress?: string;      // 访客 IP
    userAgent?: string;      // 浏览器/设备信息
    pagePath?: string;       // 访问页面路径
    createdAt?: string;      // 访问时间
}

// 获取访问记录列表
export const getSiteVisitLogList = (params?: { page?: number; size?: number; visitDate?: string; pagePath?: string }) => {
    return request<SiteVisitLog[]>({
        url: '/api/visit-logs',
        method: 'GET',
        params,
    });
};

// 根据 id 获取访问记录详情
export const getSiteVisitLogById = (id: number) => {
    return request<SiteVisitLog>({
        url: `/api/visit-logs/${id}`,
        method: 'GET',
    });
};

// 新增访问记录
export const createSiteVisitLog = (data: SiteVisitLog) => {
    return request<void>({
        url: '/api/visit-logs',
        method: 'POST',
        data,
    });
};

// 修改访问记录
export const updateSiteVisitLog = (id: number, data: Partial<SiteVisitLog>) => {
    return request<void>({
        url: `/api/visit-logs/${id}`,
        method: 'PUT',
        data,
    });
};

// 删除访问记录
export const deleteSiteVisitLog = (id: number) => {
    return request<void>({
        url: `/api/visit-logs/${id}`,
        method: 'DELETE',
    });
};

// 获取访问量（可选参数 路径/日期）
export const getVisitCount = (params?: { pagePath?: string; visitDate?: string }) => {
    return request<number>({
        url: '/api/visit-logs/count',
        method: 'GET',
        params,
    });
};
