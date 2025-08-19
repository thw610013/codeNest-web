// src/utils/admin_request.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// 创建 axios 实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '', // 从环境变量读取基础URL
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 可以统一加 token 或其他请求头
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        if (localStorage.getItem('AuthorizationNumber') != 'thw000') {
            window.location.href = '/admin/manage';
            return Promise.reject(new Error('未授权'));
        }
        return config;
    },
    (error) => {
        // 请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data;
        // 你后端统一返回结构 code、message、data，这里可以做统一处理
        if (res.code !== 200) {
            // 这里可以弹错误提示，或者统一处理逻辑
            return Promise.reject(new Error(res.message || 'Error'));
        }
        return res.data; // 直接返回数据体
    },
    (error) => {
        // 网络错误或服务器异常
        return Promise.reject(error);
    }
);

// 通用请求函数
export function request<T>(config: AxiosRequestConfig): Promise<T> {
    return service(config);
}