import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

type AntStatus = '404' | '403' | '500' | 'success' | 'info' | 'warning' | 'error';

interface ErrorConfig {
    status: AntStatus;
    title: string;
    subTitle: string;
}

const getErrorConfig = (code?: string): ErrorConfig => {
    switch (code) {
        case '400':
            return { status: 'warning', title: '400', subTitle: '错误的请求（Bad Request）' };
        case '401':
            return { status: 'error', title: '401', subTitle: '未授权访问（Unauthorized）' };
        case '403':
            return { status: '403', title: '403', subTitle: '抱歉，您无权访问该页面。' };
        case '404':
            return { status: '404', title: '404', subTitle: '抱歉，您访问的页面不存在。' };
        case '500':
            return { status: '500', title: '500', subTitle: '抱歉，服务器出错了。' };
        case '502':
            return { status: 'error', title: '502', subTitle: '网关错误（Bad Gateway）' };
        case '503':
            return { status: 'error', title: '503', subTitle: '服务不可用（Service Unavailable）' };
        default:
            return { status: 'info', title: code ?? '提示', subTitle: '发生了一点小问题，请稍后重试。' };
    }
};

const ErrorPage: React.FC = () => {
    const { code } = useParams<{ code?: string }>();
    const navigate = useNavigate();

    const cfg = getErrorConfig(code);

    return (
        <Result
            status={cfg.status}
            title={cfg.title}
            subTitle={cfg.subTitle}
            extra={
                <Button type="primary" onClick={() => navigate(-1)}>
                    返回上一页
                </Button>
            }
        />
    );
};

export default ErrorPage;

