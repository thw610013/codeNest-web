import { useState, useEffect } from "react";
import {
    Divider,
    Col,
    Row,
    Input,
    Select,
    DatePicker,
    Tag,
    Space,
} from "antd";
import { LikeOutlined, EyeOutlined, MessageOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import { searchArticles, type Article } from "../../api/article_api";
import HighlightText from "../../components/HighlightText";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface SearchParams {
    title?: string;
    content?: string;
    tag?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
}

export default function Articles() {
    const navigate = useNavigate();

    const [articleList, setArticleList] = useState<Article[]>([]);
    const [total, setTotal] = useState(0);
    const [searchParams, setSearchParams] = useState<SearchParams>({
        tag: "all",
        page: 1,
        size: 10,
    });
    const [searchKeyword, setSearchKeyword] = useState("");

    const fetchArticles = async (params: SearchParams) => {
        try {
            const res = await searchArticles(params);
            if (Array.isArray(res)) {
                setArticleList(res);
                setTotal(res.length);
            } else {
                setArticleList([]);
                setTotal(0);
            }
        } catch (error) {
            console.error("搜索文章出错:", error);
            setArticleList([]);
            setTotal(0);
        }
    };

    useEffect(() => {
        fetchArticles(searchParams);
    }, [searchParams]);

    const onSearch = (value: string) => {
        setSearchKeyword(value.trim());
        setSearchParams((prev) => ({
            ...prev,
            title: value.trim(),
            content: value.trim(),
            page: 1,
        }));
    };

    const onTagChange = (value: string) => {
        setSearchParams((prev) => ({
            ...prev,
            tag: value,
            page: 1,
        }));
    };

    const onDateChange: RangePickerProps['onChange'] = (dates) => {
        if (!dates || !dates[0] || !dates[1]) {
            setSearchParams((prev) => ({
                ...prev,
                startDate: undefined,
                endDate: undefined,
                page: 1,
            }));
            return;
        }
        setSearchParams((prev) => ({
            ...prev,
            startDate: dayjs(dates[0]).format("YYYY-MM-DD"),
            endDate: dayjs(dates[1]).format("YYYY-MM-DD"),
            page: 1,
        }));
    };

    return (
        <div>
            <Row gutter={[16, 16]} justify="start" align="middle" style={{ marginBottom: 20 }}>
                <Col xs={24} sm={24} md={6}>
                    <h2 className="title">技术文章</h2>
                    <p className="description">分享技术，记录生活</p>
                </Col>

                <Col xs={24} sm={12} md={4}>
                    <Select
                        defaultValue="all"
                        style={{ width: '100%' }}
                        onChange={onTagChange}
                        value={searchParams.tag}
                    >
                        <Option value="all">全部</Option>
                        <Option value="difficult">疑难杂症</Option>
                        <Option value="share">技术分享</Option>
                        <Option value="diary">学习日记</Option>
                        <Option value="other">其他</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <RangePicker style={{ width: '100%' }} onChange={onDateChange} />
                </Col>

                <Col xs={24} sm={24} md={6}>
                    <Search
                        placeholder="搜索标题和内容"
                        onSearch={onSearch}
                        allowClear
                        enterButton
                        style={{ width: '100%' }}
                    />
                </Col>
            </Row>

            {articleList.map((item) => (
                <div
                    key={item.id}
                    className="article-item"
                    onClick={() => navigate(`/articles/${item.id}`)}
                    style={{ cursor: "pointer", padding: "12px 0" }}
                >
                    <Divider dashed />
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={20}>
                            <h3 className="article-title">
                                <HighlightText text={item.title} keyword={searchKeyword} />
                            </h3>
                            <p
                                style={{
                                    width: "100%",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <HighlightText text={item.content} keyword={searchKeyword} />
                            </p>
                            <div>
                                <Space size="middle" wrap>
                                    <span>
                                        <LikeOutlined /> {item.likes ?? 0}
                                    </span>
                                    <span>
                                        <MessageOutlined /> {item.views ?? 0}
                                    </span>
                                    <span>
                                        <EyeOutlined /> {item.views ?? 0}
                                    </span>
                                    <span>{item.createdAt?.slice(0, 10)}</span>
                                </Space>
                            </div>
                        </Col>

                        <Col xs={24} md={4}>
                            <div>标签：</div>
                            <Space wrap size={[4, 4]}>
                                {(item.tags?.split(",") || []).map((tag) => (
                                    <Tag
                                        key={tag}
                                        color={
                                            tag === "difficult"
                                                ? "#f50"
                                                : tag === "share"
                                                    ? "#2db7f5"
                                                    : tag === "diary"
                                                        ? "#87d068"
                                                        : "#108ee9"
                                        }
                                    >
                                        {tag === "diary"
                                            ? "学习日记"
                                            : tag === "share"
                                                ? "技术分享"
                                                : tag === "difficult"
                                                    ? "疑难杂症"
                                                    : tag === "other"
                                                        ? "其他"
                                                        : tag}
                                    </Tag>
                                ))}
                            </Space>
                        </Col>
                    </Row>
                </div>
            ))}

            <div style={{ marginTop: 16 }}>
                共 <strong>{total}</strong> 条
            </div>
        </div>
    );
}