// src/pages/home.tsx
import CarouselComponent from '../../components/Carousel';
import CarouselDiv from '../../components/carouseDiv/CarouselDiv';
import { Row, Col, Divider, Spin } from "antd";
import './index.css';
import HomeTable from './components/HomeTable';
import { useEffect, useState } from 'react';
import { type FeaturedContent, getFeaturedContentList } from '../../api/featured_content_api';

export default function Home() {

    const titleList = [
        { title: '做技术没有什么难的，难的是人情世故' },
        { title: '认真学一学，没有想的那么难，试一试，万一失败了呢' },
        { title: '人生就像代码，明明写得好好的，运行时却总出错' },
        { title: '梦想很美好，现实很骨感，别忘了骨头还是给自己顶着呢' }
    ];

    const [tools, setTools] = useState<FeaturedContent[]>([]);
    const [websites, setWebsites] = useState<FeaturedContent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getFeaturedContentList()
            .then(res => {
                // 按 type 分类
                setTools(res.filter(item => item.type === 'tool'));
                setWebsites(res.filter(item => item.type === 'website'));
            })
            .finally(() => setLoading(false));
    }, []);
    // 取 tools 中第 0-3 条
    const convertToCardDataOne = (items: FeaturedContent[]) =>
        items.slice(0, 4).map((item, idx) => ({
            id: item.id ?? idx,
            title: item.name,
            image: item.image,
            description: item.description,
            linkUrl: item.linkUrl || '',
            type: item.type,
        }));

    // 取 tools 中第 4-7 条
    const convertToCardDataTwo = (items: FeaturedContent[]) =>
        items.slice(4, 8).map((item, idx) => ({
            id: item.id ?? idx + 4,
            title: item.name,
            image: item.image,
            description: item.description,
            linkUrl: item.linkUrl || '',
            type: item.type,
        }));

    // 取 tools 中第 8-11 条
    const convertToCardDataThree = (items: FeaturedContent[]) =>
        items.slice(8, 12).map((item, idx) => ({
            id: item.id ?? idx + 8,
            title: item.name,
            image: item.image,
            description: item.description,
            linkUrl: item.linkUrl || '',
            type: item.type,
        }));

    // website 分组转换
    const convertWebsiteDataOne = (items: FeaturedContent[]) =>
        items.slice(0, 4).map((item, idx) => ({
            id: item.id ?? idx,
            title: item.name,
            image: item.image,
            description: item.description,
            linkUrl: item.linkUrl || '',
            type: item.type,
        }));

    const convertWebsiteDataTwo = (items: FeaturedContent[]) =>
        items.slice(4, 8).map((item, idx) => ({
            id: item.id ?? idx + 4,
            title: item.name,
            image: item.image,
            description: item.description,
            linkUrl: item.linkUrl || '',
            type: item.type,
        }));

    const convertWebsiteDataThree = (items: FeaturedContent[]) =>
        items.slice(8, 12).map((item, idx) => ({
            id: item.id ?? idx + 8,
            title: item.name,
            image: item.image,
            description: item.description,
            linkUrl: item.linkUrl || '',
            type: item.type,
        }));

    return (
        <div>
            {/* <h2 className="title">精选热况</h2> */}
            {/* 轮播 */}
            <CarouselComponent />
            {/* 牢骚区域 */}
            <div id="hotConditions">
                <Row align="middle" gutter={16} >
                    <Col span={12} >
                        <ul className="square-list">
                            <li>{titleList[0].title}</li>
                        </ul>
                    </Col>
                    <Col span={12} >
                        <ul className="square-list">
                            <li>
                                {titleList[1].title}
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Divider />
                <Row align="middle" gutter={16} >
                    <Col span={12} >
                        <ul className="square-list">
                            <li>{titleList[2].title}</li>
                        </ul>
                    </Col>
                    <Col span={12}>
                        <ul className="square-list">
                            <li>
                                {titleList[3].title}
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Divider />
            </div>

            <h2 className="title">精选链接</h2>
            <div id="selectedLinks" >
                {loading ? (
                    <Spin tip="加载中..." style={{ display: 'block', margin: '100px auto' }} />
                ) : (
                    <CarouselDiv
                        group1Cards={convertToCardDataOne(tools)}
                        group2Cards={convertToCardDataTwo(tools)}
                        group3Cards={convertToCardDataThree(tools)}
                    />
                )}
            </div>

            {/* 精选网站 */}
            <h2 className="title">精选网站</h2>
            <div id="selectedWebsites">
                {loading ? (
                    <Spin tip="加载中..." style={{ display: 'block', margin: '100px auto' }} />
                ) : (
                    <CarouselDiv
                        group1Cards={convertWebsiteDataOne(websites)}
                        group2Cards={convertWebsiteDataTwo(websites)}
                        group3Cards={convertWebsiteDataThree(websites)}
                    />
                )}
            </div>

            <h2 className="title">精选文章</h2>
            <div>
                <HomeTable />
            </div>

        </div>);
}
