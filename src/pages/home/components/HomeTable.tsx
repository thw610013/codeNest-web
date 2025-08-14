import { Divider, Col, Row, Typography, Space } from "antd";
import { LikeOutlined, EyeOutlined, MessageOutlined } from "@ant-design/icons";
import "./index.css";
import { type Article, getArticleList } from "../../../api/article_api";
import { useState } from "react";
import { useEffect } from "react";
const { Title, Paragraph } = Typography;
import { Link } from "react-router-dom";
export default function HomeTable() {
    const [articleList, setArticleList] = useState<Article[]>([]);
    useEffect(() => {
        getArticleList().then((list) => {
            setArticleList(list); // list 已经是 Article[] 了
        });
    }, []);
    return (
        <div >
            {articleList.map((item) => (
                <div key={item.title}>
                    <Divider dashed />
                    <div style={{ width: "80%", margin: "0 auto" }}>
                        <Link
                            to={`/articles/${item.id}`}
                            style={{ color: 'black', textDecoration: 'none' }}
                            className="article-link"
                        >
                            <Row>
                                <Col span={12}>
                                    <Title level={5} className="article-title">{item.title}</Title>
                                    <Paragraph>{item.summary}</Paragraph>
                                    <Space>
                                        <span className="info-item-icon"><LikeOutlined /></span><span className="info-item">{item.likes}</span>
                                        <span className="info-item-icon"><MessageOutlined /></span><span className="info-item">{item.views}</span>
                                        <span className="info-item-icon"><EyeOutlined /></span><span className="info-item">{item.views}</span>
                                        <span className="info-item">{item.createdAt}</span>
                                    </Space>
                                </Col>
                            </Row>
                        </Link>
                    </div>
                </div>
            ))}

        </div>
    )
}