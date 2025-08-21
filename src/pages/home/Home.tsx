// import CarouselComponent from '../../components/Carousel';
import { Flex, } from "antd";
import './index.css';

import { useEffect, useState } from 'react';
import { getFeaturedContentList } from '../../api/featured_content_api';
import { createSiteVisitLog } from '../../api/site_visit_log_api';
import LightRays from '../home/components/lightRays/LightRays';
import TextType from './components/textType/TextType';
import ScrollStack, { ScrollStackItem } from './components/scrollStack/ScrollStack';
import GradientText from './components/gradientText/GradientText';
import FallingText from './components/fallingText/FallingText';
import ClickSpark from './components/clickSpark/ClickSpark';
import CountUp from './components/countup/Countup';
import { getVisitCount } from '../../api/site_visit_log_api';
import TrueFocus from './components/trueFocus/TrueFocus';
import { Link } from 'react-router-dom';
import { ChromaGrid } from './components/chromaGrid/ChromaGrid';
import { type FeaturedContent } from '../../api/featured_content_api';
import { type Article, getArticleList } from '../../api/article_api';
import RollingGallery from '../../components/rollingGallery/RollingGallery';
import Magnet from './components/magnet/Magnet';
import ShinyText from './components/shinyText/ShinyText';

export default function Home() {

    const [fontSize, setFontSize] = useState<number>(100); // 默认大屏字体
    const [vistCount, setVistCount] = useState<number>(0);
    const [websiteItems, setWebsiteItems] = useState<FeaturedContent[]>([]);
    const [articleList, setArticleList] = useState<Article[]>([]);

    useEffect(() => {
        createSiteVisitLog({
            visitDate: new Date().toISOString().split('T')[0],
            pagePath: '/home',
            userAgent: navigator.userAgent
        }).catch(err => console.error('访问记录上传失败', err));
    }, []);

    useEffect(() => {

        getFeaturedContentList()
            .then(res => {
                console.log(res);
                const webs = res.filter(item => item.type === 'website');
                setWebsiteItems(webs);
            })
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                // 手机屏幕
                setFontSize(20);
            } else {
                // 正常电脑屏幕
                setFontSize(100);
            }
        };
        // 初始化调用一次
        handleResize();
        // 添加事件监听
        window.addEventListener('resize', handleResize);
        // 组件卸载时清理
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 获取访客数
    useEffect(() => {
        getVisitCount().then(setVistCount);
    }, []);

    //推荐文章
    useEffect(() => {
        getArticleList().then((list) => {
            setArticleList(list); // list 已经是 Article[] 了
        });
    }, []);

    return (
        <div>
            <ClickSpark
                sparkColor='#7FB5F8'
                sparkSize={20}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
            >
                {/* 全屏动画区 */}
                <div className="home-hero">
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#00ffff"
                        raysSpeed={1.5}
                        lightSpread={1.2}
                        fadeDistance={1.2}
                        rayLength={2}
                        followMouse={true}
                        mouseInfluence={0.1}
                        noiseAmount={0.1}
                        distortion={0.05}
                    />
                    <div className="home-hero__content">
                        <TextType
                            text={["CodeNest，代码的巢，温暖又安全", "welcome"]}
                            typingSpeed={100}
                            pauseDuration={3000}
                            showCursor={true}
                            cursorCharacter="|"
                            style={{ fontSize: `${fontSize}px` }}
                            loop={true}
                        />
                    </div>
                </div>

                <section className="home-scroll-stack">
                    <div>
                        <ScrollStack>

                            <ScrollStackItem  >
                                <Flex >
                                    <GradientText
                                        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                                        animationSpeed={3}
                                        showBorder={false}
                                        className="custom-class"
                                    >
                                        千里之行
                                        始于足下
                                    </GradientText>

                                </Flex>
                            </ScrollStackItem>
                            <ScrollStackItem>
                                <Flex justify='center' align='center'>
                                    <GradientText
                                        colors={[
                                            "#8e44ad", // 紫
                                            "#9b59b6", // 淡紫
                                            "#e67e22", // 橙
                                            "#f1c40f", // 黄
                                            "#f39c12"  // 金黄
                                        ]}
                                        animationSpeed={3}
                                        showBorder={false}
                                        className="custom-class"
                                    >
                                        胜而不骄
                                        败而不馁
                                    </GradientText>

                                </Flex>
                            </ScrollStackItem>
                            <ScrollStackItem>
                                <Flex justify='center' align='center'>
                                    <GradientText
                                        colors={[
                                            "#0f2027", // 深蓝黑
                                            "#203a43", // 靛青
                                            "#2c5364", // 青黑蓝
                                            "#6a0572", // 紫红
                                            "#c06c84"  // 玫瑰金粉
                                        ]}
                                        animationSpeed={3}
                                        showBorder={false}
                                        className="custom-class"
                                    >
                                        逆水行舟
                                        不进则退
                                    </GradientText>

                                </Flex>
                            </ScrollStackItem>
                            <ScrollStackItem>
                                <Flex justify='center' align='center'>
                                    <GradientText
                                        colors={[
                                            "#FF0000", // 鲜红
                                            "#FF7F00", // 橙色
                                            "#FFFF00", // 亮黄
                                            "#00FFFF", // 青色
                                            "#007FFF"  // 青蓝
                                        ]}
                                        animationSpeed={3}
                                        showBorder={false}
                                        className="custom-class"
                                    >
                                        谋事在人
                                        成事在天
                                    </GradientText>

                                </Flex>
                            </ScrollStackItem>
                        </ScrollStack>
                    </div>
                </section>

                <Flex justify='center' align='center' style={{ margin: '70vh 0 0 0' }}>
                    <FallingText
                        text={`技术栈 React Bits SpringBoot Mysql AntDesignReact TS MyBatisPlus Knif4j`}
                        highlightWords={["React", "Bits", "SpringBoot"]}
                        highlightClass="highlighted"
                        trigger="scroll"
                        backgroundColor="transparent"
                        wireframes={false}
                        gravity={0.56}
                        fontSize="2rem"
                        mouseConstraintStiffness={0.9}
                    />
                </Flex>

                <Flex justify='center' align='center' style={{ margin: '70vh 0 20vh 0' }}>
                    <GradientText
                        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                        animationSpeed={3}
                        showBorder={false}
                    >
                        <span>总访客数：</span>
                        <CountUp
                            from={0}
                            to={vistCount}
                            separator=","
                            direction="up"
                            duration={1}
                            className='count-up-text'
                        />
                    </GradientText>
                </Flex>

                <Flex justify='center' align='center' style={{ margin: '70vh 0 70vh 0' }}>
                    <Link to="/questionbank" style={{ textDecoration: 'none' }}>
                        <TrueFocus
                            sentence="好好学习 天天向上！"
                            manualMode={false}
                            blurAmount={5}
                            borderColor="black"
                            animationDuration={2}
                            pauseBetweenAnimations={1}
                        />
                    </Link>
                </Flex>

                <Flex justify='center' align='center' style={{ margin: '70vh 0 70vh 0', height: 'auto' }}>
                    <ChromaGrid
                        items={websiteItems.map(item => ({
                            image: item.image,
                            title: item.name,
                            subtitle: item.description,
                            url: item.linkUrl || '',
                            borderColor: "#10B981",
                        }))}
                        radius={300}
                        damping={0.45}
                        fadeOut={0.6}
                        ease="power3.out"
                        className="chroma-grid-website"
                    />
                </Flex>

                <Flex justify='center' vertical align='center' style={{ margin: '70vh 0 0 0', height: 'auto' }}>
                    <GradientText
                        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                        animationSpeed={3}
                        showBorder={false}
                        className='custom-class '
                    >
                        精选文章
                    </GradientText>
                    <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                        {articleList.map((item) => (
                            <Magnet key={item.id ?? item.title} padding={200} magnetStrength={3}>
                                <Link to={`/articles/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ShinyText
                                        text={`✨ ${item.title} 🚀`}
                                        className='article-title flicker'
                                        speed={3}
                                        disabled={false}
                                    />
                                </Link>
                            </Magnet>
                        ))}
                    </div>
                </Flex>

                <Flex justify='center' align="center" vertical style={{ margin: '70vh 0 0 0', height: 'auto', backgroundColor: '#181421' }}>

                    <GradientText
                        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                        animationSpeed={3}
                        showBorder={false}
                        className='custom-class '
                    >
                        从 Hello World 到世界
                    </GradientText>
                    <RollingGallery autoplay={true} pauseOnHover={true} />

                    <span style={{ color: 'white', fontSize: 12 }}>备案号：</span>
                    <span style={{ color: 'white', fontSize: 12 }}>©{new Date().getFullYear()} CodeNest  版权所有</span>

                </Flex>

            </ClickSpark>

        </div>
    );
}