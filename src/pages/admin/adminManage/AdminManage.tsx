import { useEffect, useState } from "react";
import { Typography, Space, Input, Button } from "antd";
const { Title } = Typography;

export default function Greeting() {
    const [time, setTime] = useState(new Date());

    // 每隔 1 秒更新一次时间
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // 组件卸载时清理定时器
    }, []);

    // 根据时间返回问候语
    const getGreeting = (hour: number) => {
        if (hour < 10) return "早上好";
        if (hour < 12) return "中午好";
        if (hour < 18) return "下午好";
        if (hour < 23) return "晚上好";
        if (hour < 6) return "夜深了，注意休息";
        return "夜深了，注意休息";
    };

    const [authCode, setAuthCode] = useState('');

    const handleAuth = () => {
        localStorage.setItem('AuthorizationNumber', authCode);

    };

    return (
        <div>
            <Title level={1}>
                <Space direction="vertical">
                    <span>Administrator,{getGreeting(time.getHours())}!</span>
                    <span>{time.toLocaleString()}</span>
                </Space>

            </Title>
            <Space direction="vertical">
                <Input placeholder="请输入管理授权码" value={authCode} onChange={(e) => setAuthCode(e.target.value)} />
                <Button type="primary" onClick={handleAuth}>授权</Button>
            </Space>
        </div>
    );
}