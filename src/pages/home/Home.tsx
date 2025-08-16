import CarouselComponent from '../../components/Carousel';
import CarouselDiv from '../../components/carouseDiv/CarouselDiv';
import { Row, Col, Divider, Spin, Card } from "antd";
import './index.css';
import HomeTable from './components/HomeTable';
import { useEffect, useState } from 'react';
import { type FeaturedContent, getFeaturedContentList } from '../../api/featured_content_api';
import { createSiteVisitLog } from '../../api/site_visit_log_api';

export default function Home() {

    const titleList = [
        { title: '千里之行，始于足下。' },
        { title: '胜而不骄，败而不馁。' },
        { title: '保持热爱，大胆向前。' },

    ];

    const [tools, setTools] = useState<FeaturedContent[]>([]);
    const [websites, setWebsites] = useState<FeaturedContent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        createSiteVisitLog({
            visitDate: new Date().toISOString().split('T')[0],
            pagePath: '/home',
            userAgent: navigator.userAgent
        }).catch(err => console.error('访问记录上传失败', err));
    }, []);

    useEffect(() => {
        setLoading(true);
        getFeaturedContentList()
            .then(res => {
                setTools(res.filter(item => item.type === 'tool'));
                setWebsites(res.filter(item => item.type === 'website'));
            })
            .finally(() => setLoading(false));
    }, []);

    // 数据转换函数
    const sliceCards = (items: FeaturedContent[], start: number, end: number) =>
        items.slice(start, end).map((item, idx) => ({
            id: item.id ?? idx + start,
            title: item.name,
            image: item.image,
            description: item.description,
            linkUrl: item.linkUrl || '',
            type: item.type,
        }));

    return (
        <div>
            {/* 轮播 */}
            <CarouselComponent />

            {/* 快乐箴言区域 */}
            <Divider orientation="left" style={{ color: '#2A85F9' }}>快乐箴言</Divider>
            <Row gutter={[16, 16]}>
                {titleList.map((t, idx) => (
                    <Col key={idx} xs={24} sm={12} md={12} lg={6}>
                        <Card hoverable style={{ minHeight: 80, textAlign: 'center' }}>
                            {t.title}
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 精选链接 */}
            <Divider orientation="left" style={{ color: '#2A85F9' }}>精选链接</Divider>
            {loading ? (
                <Spin tip="加载中..." style={{ display: 'block', margin: '100px auto' }} />
            ) : (
                <CarouselDiv
                    group1Cards={sliceCards(tools, 0, 4)}
                    group2Cards={sliceCards(tools, 4, 8)}
                    group3Cards={sliceCards(tools, 8, 12)}
                />
            )}

            {/* 精选网站 */}
            <Divider orientation="left" style={{ color: '#2A85F9' }}>精选网站</Divider>
            {loading ? (
                <Spin tip="加载中..." style={{ display: 'block', margin: '100px auto' }} />
            ) : (
                <CarouselDiv
                    group1Cards={sliceCards(websites, 0, 4)}
                    group2Cards={sliceCards(websites, 4, 8)}
                    group3Cards={sliceCards(websites, 8, 12)}
                />
            )}

            {/* 精选文章 */}
            <Divider orientation="left" style={{ color: '#2A85F9' }}>精选文章</Divider>
            <HomeTable />
        </div>
    );
}