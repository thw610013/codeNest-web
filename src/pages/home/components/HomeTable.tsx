import { Divider, Col, Row } from "antd";
import { LikeOutlined, EyeOutlined, MessageOutlined } from "@ant-design/icons";
import "./index.css";
import { type Article, getArticleList } from "../../../api/article_api";
import { useState } from "react";
import { useEffect } from "react";

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
                        <Row>
                            <Col span={12}>
                                <h3>{item.title}</h3>
                                <p>{item.summary}</p>
                                <p>
                                    <span className="info-item-icon"><LikeOutlined /></span><span className="info-item">{item.likes}</span>
                                    <span className="info-item-icon"><MessageOutlined /></span><span className="info-item">{item.views}</span>
                                    <span className="info-item-icon"><EyeOutlined /></span><span className="info-item">{item.views}</span>
                                    <span className="info-item">{item.createdAt}</span>
                                </p>

                            </Col>
                        </Row>
                    </div>
                </div>
            ))}

        </div>
    )
}