import React, { useState } from 'react';
import {
    FileOutlined,
    ToolOutlined,
    QuestionOutlined,
    MessageOutlined,
    InfoCircleOutlined,
    DashboardOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('首页', 'admin', <HomeOutlined />),
    getItem('文章管理', 'article', <FileOutlined />),
    getItem('工具管理', 'tool', <ToolOutlined />),
    getItem('数据面板', 'data', <DashboardOutlined />),
    getItem('题库管理', 'question', <QuestionOutlined />),
    getItem('留言管理', 'message', <MessageOutlined />),
    getItem('个人介绍管理', 'about', <InfoCircleOutlined />),
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'admin') {
            navigate('/admin/manage');
        } else if (e.key === 'data') {
            navigate('/admin/manage/data');
        } else if (e.key === 'message') {
            navigate('/admin/manage/message');
        } else if (e.key === 'article') {
            navigate('/admin/manage/article');
        } else if (e.key === 'tool') {
            navigate('/admin/manage/tool');
        } else if (e.key === 'question') {
            navigate('/admin/manage/question');
        } else if (e.key === 'about') {
            navigate('/admin/manage/about');
        }

        // 其它菜单项可以依次添加
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: colorBgContainer }}>
                <div />
                <Menu
                    theme="light"
                    defaultSelectedKeys={['']}
                    mode="inline"
                    items={items}
                    onClick={handleMenuClick}
                />

            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} />
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;