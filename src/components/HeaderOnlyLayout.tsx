import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout as AntLayout, Menu, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';

const { Header } = AntLayout;

const menuItems = [
    {
        key: '', label: 'CodeNest', style: { color: '#2A85F9', fontSize: '20px', fontWeight: 'bold' },
        icon: <img src="/favicon.png" alt="CodeNest" style={{ width: '20px', height: '20px' }} />
    },
    { key: '/', label: '首页' },
    { key: '/tools', label: '工具' },
    { key: '/questionbank', label: '题库' },
    { key: '/articles', label: '技术文章' },
    { key: '/wallpaper', label: '精选壁纸' },
    { key: '/messageboard', label: '留言板' },
    { key: '/about', label: '关于' },
];

export default function HeaderOnlyLayout() {
    theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollTop = useRef(0);

    const pathname = location.pathname.toLowerCase();
    let baseKey = '/' + (pathname.split('/')[1] || '');

    if (pathname.startsWith('/articles/')) baseKey = '/articles';
    if (pathname.startsWith('/tools/')) baseKey = '/tools';
    if (pathname.startsWith('/questionbank/questiondetails/')) baseKey = '/questionbank';
    if (pathname.startsWith('/questionbank/questions/')) baseKey = '/questionbank';
    if (baseKey === '') baseKey = '/';

    const selectedKey = menuItems.some(item => item.key === baseKey) ? baseKey : '/';
    const onMenuClick = ({ key }: { key: string }) => navigate(key);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop.current && scrollTop > 100) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AntLayout style={{ minHeight: '100vh', background: 'transparent' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px #f0f1f2',
                    transition: 'transform 0.3s ease',
                    transform: showHeader ? 'translateY(0)' : 'translateY(-100%)'
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
            <Outlet />
        </AntLayout>
    );
}

