
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout as AntLayout, Menu, theme, Row, Space } from 'antd';
import { getVisitCount } from '../api/site_visit_log_api';
import { useEffect, useState } from 'react';

const { Header, Content, Footer } = AntLayout;

const menuItems = [
    { key: '', label: 'CodeNest', style: { color: '#2A85F9', fontSize: '20px', fontWeight: 'bold' } },
    { key: '/', label: '首页' },
    { key: '/tools', label: '工具' },
    { key: '/questionbank', label: '题库' },
    { key: '/articles', label: '技术文章' },
    { key: '/wallpaper', label: '精选壁纸' },
    { key: '/messageboard', label: '留言板' },
    { key: '/about', label: '关于' },
];
export default function Layout() {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();
    const [vistCount, setVistCount] = useState<number>(0);
    const pathname = location.pathname.toLowerCase(); // 统一转小写
    let baseKey = '/' + (pathname.split('/')[1] || '');

    // 详情页归属到对应的列表页
    if (pathname.startsWith('/articles/')) {
        baseKey = '/articles';
    }
    if (pathname.startsWith('/tools/')) {
        baseKey = '/tools';
    }
    if (pathname.startsWith('/questionbank/questiondetails/')) {
        baseKey = '/questionbank';
    }
    if (pathname.startsWith('/questionbank/questions/')) {
        baseKey = '/questionbank';
    }
    if (baseKey === '') {
        baseKey = '/';
    }

    const selectedKey = menuItems.some(item => item.key === baseKey) ? baseKey : '/';

    const onMenuClick = ({ key }: { key: string }) => {
        navigate(key);
    };

    useEffect(() => {
        getVisitCount().then((vistCount: number) => {
            setVistCount(vistCount);
        });
    }, []);
    return (
        <AntLayout style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px #f0f1f2',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="light"
                    mode="horizontal"
                    selectedKeys={[selectedKey]}
                    items={menuItems}
                    onClick={onMenuClick}
                    style={{ flex: 1, minWidth: 0 }}
                />
                <div style={{ color: '#2A85F9', fontSize: '20px', fontWeight: 'bold' }}>
                    代码的巢，温暖又安全
                </div>
            </Header>
            <Content style={{ padding: '0 48px', flex: 1 }}>
                {/* 面包屑可以根据 location 动态生成 */}
                <Breadcrumb style={{ margin: '16px 0' }}>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet /> {/* 这里渲染嵌套路由的内容 */}
                </div>
            </Content>
            <Footer>
                <Row justify="center">
                    <Space>
                        <span>最近更新时间：2025-08-11</span>
                        <span>总访客:{vistCount}</span>
                    </Space></Row>
                <Row justify="center">备案号：</Row>
                <Row justify="center"> CodeNest ©{new Date().getFullYear()} Created by Ant UED</Row>
            </Footer>
        </AntLayout>
    );
};

