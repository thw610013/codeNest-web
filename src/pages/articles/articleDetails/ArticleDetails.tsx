import { useParams, useNavigate } from 'react-router-dom';
import "./index.css";
import { Card, Row, Col, Tag, Button, Space } from "antd";
import MdViewer from '../../../components/MdViewer';
import { getArticleById, type Article } from "../../../api/article_api";
import { useState, useEffect } from "react";
import { createContentVisitLog, getVisitLogsByArticleId } from "../../../api/content_visit_log_api";
import { getLikeByTarget } from "../../../api/like_record_api";
import LikeButton from '../../../components/LikeButton';

export default function ArticleDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [visitCount, setVisitCount] = useState<number>(0);
    const [likeCount, setLikeCount] = useState<number>(0);

    useEffect(() => {
        if (!id) return;

        const articleId = Number(id);

        createContentVisitLog({
            visitDate: new Date().toISOString().split("T")[0],
            articleId
        }).catch(console.error);

        getArticleById(articleId).then(setArticle);

        getVisitLogsByArticleId(articleId).then(data => setVisitCount(data));

        getLikeByTarget("1", articleId).then(data => setLikeCount(data || 0));
    }, [id]);

    return (
        <div>
            <Space direction="vertical" style={{ width: "100%" }}>
                {/* 返回、上一篇、下一篇按钮 */}
                <Space wrap>
                    <Button type="default" onClick={() => navigate(`/articles`)}>返回</Button>
                    <Button type="default" onClick={() => navigate(`/articles/${Number(id) - 1}`)}>上一篇</Button>
                    <Button type="default" onClick={() => navigate(`/articles/${Number(id) + 1}`)}>下一篇</Button>
                </Space>

                {/* 文章信息 */}
                <Card title={article?.title} style={{ width: "100%" }}>
                    <Row gutter={[16, 8]}>
                        <Col xs={24} sm={12} md={6}><p>作者：{article?.author}</p></Col>
                        <Col xs={24} sm={12} md={6}><p>发布时间：{article?.createdAt}</p></Col>
                        <Col xs={24} sm={12} md={6}><p>浏览量：{visitCount}</p></Col>
                        <Col xs={24} sm={12} md={6}><p>点赞量：{likeCount}</p></Col>
                    </Row>
                    <Row gutter={[16, 8]}>
                        <Col xs={24} sm={12}><span>分类专栏：写死的</span></Col>
                        <Col xs={24} sm={12}>
                            <span>文章标签：
                                <Tag
                                    key={article?.tags}
                                    color={
                                        article?.tags === "difficult"
                                            ? "#f50"
                                            : article?.tags === "share"
                                                ? "#2db7f5"
                                                : article?.tags === "diary"
                                                    ? "#87d068"
                                                    : "#108ee9"
                                    }
                                >
                                    {article?.tags === "diary" ? "学习日记" : article?.tags === "share" ? "技术分享" : article?.tags === "difficult" ? "疑难杂症" : article?.tags === "other" ? "其他" : article?.tags}
                                </Tag>
                            </span>
                        </Col>
                    </Row>
                </Card>

                {/* 文章内容 */}
                <Card style={{ width: "100%" }}>
                    <MdViewer value={article?.content || ""} />
                </Card>

                {/* 点赞按钮 */}
                <LikeButton
                    targetId={String(id)}
                    targetType="1"
                    onSuccess={() => {
                        getLikeByTarget("1", Number(id)).then(data => setLikeCount(data || 0));
                    }}
                />
            </Space>
        </div>
    );
}