import { useParams } from 'react-router-dom';
import "./index.css";
import { Card, Row, Col, Tag, Button, Space } from "antd";
import MdViewer from '../../../components/MdViewer';
import { getArticleById } from "../../../api/article_api";
import { type Article } from "../../../api/article_api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function ArticleDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    const [article, setArticle] = useState<Article | null>(null);
    useEffect(() => {
        getArticleById(Number(id)).then((article) => {
            setArticle(article || null);
        });
    }, [id]);
    return (
        <div>
            <Space direction="vertical" style={{ width: "100%" }}>
                {/* 加入返回，上一篇，下一篇按钮 */}
                <Space>
                    <Button type="default" onClick={() => navigate(`/articles`)}>返回</Button>
                    <Button type="default" onClick={() => navigate(`/articles/${Number(id) - 1}`)}>上一篇</Button>
                    <Button type="default" onClick={() => navigate(`/articles/${Number(id) + 1}`)}>下一篇</Button>
                </Space>
                <Card title={article?.title}>
                    <Row>
                        <Col span={6}>
                            <p>作者：{article?.author}</p>
                        </Col>
                        <Col span={6}>
                            <p>发布时间：{article?.createdAt}</p>
                        </Col>
                        <Col span={6}>
                            <p>浏览量：{article?.views}</p>
                        </Col>
                        <Col span={6}>
                            <p>点赞量：{article?.likes}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <span>分类专栏：写死的</span>
                        </Col>
                        <Col span={12}>
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
                                    {/* 如果 tag == diary 则替换成学习日记，以此类推 */}
                                    {article?.tags === "diary" ? "学习日记" : article?.tags === "share" ? "技术分享" : article?.tags === "difficult" ? "疑难杂症" : article?.tags === "other" ? "其他" : article?.tags}
                                </Tag>
                            </span>
                        </Col>
                    </Row>
                </Card>

                <Row>
                    <Col span={4}>
                    </Col>
                    <Col span={16}>
                        <Card style={{ width: "100%" }}>
                            <MdViewer value={article?.content || ""} />
                        </Card>
                    </Col>
                    <Col span={4}>
                    </Col>
                </Row>

            </Space>
        </div>

    )
}