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

    // 维护搜索参数
    const [searchParams, setSearchParams] = useState<SearchParams>({
        tag: "all",
        page: 1,
        size: 10,
    });

    // 维护当前搜索关键字（用于高亮）
    const [searchKeyword, setSearchKeyword] = useState("");

    // 请求数据函数
    const fetchArticles = async (params: SearchParams) => {
        try {
            const res = await searchArticles(params);
            console.log(res)
            if (Array.isArray(res)) {
                setArticleList(res);
                setTotal(res.length); // 你这没分页，只能用长度
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

    // 监听搜索参数变化自动拉数据
    useEffect(() => {
        fetchArticles(searchParams);
    }, [searchParams]);

    // 搜索框搜索
    const onSearch = (value: string) => {
        setSearchKeyword(value.trim());
        setSearchParams((prev) => ({
            ...prev,
            title: value.trim(),
            content: value.trim(),
            page: 1,
        }));
    };

    // 标签切换
    const onTagChange = (value: string) => {
        setSearchParams((prev) => ({
            ...prev,
            tag: value,
            page: 1,
        }));
    };

    // 日期区间切换
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
            <Row justify="center" align="middle" gutter={16} style={{ marginBottom: 20 }}>
                <Col span={2}>
                    <h2 className="title">技术文章</h2>
                    <p className="description">分享技术，记录生活</p>
                </Col>

                <Col span={6}>
                    <Select
                        defaultValue="all"
                        style={{ width: 150 }}
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

                <Col span={8}>
                    <RangePicker onChange={onDateChange} />
                </Col>

                <Col span={8}>
                    <Search
                        placeholder="搜索标题和内容"
                        onSearch={onSearch}
                        allowClear
                        enterButton
                        style={{ width: 400 }}
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
                    <Row gutter={16}>
                        <Col span={20}>
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
                            <p>
                                <Space size="middle">
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
                            </p>
                        </Col>

                        <Col span={4}>
                            <p>标签：</p>
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
                                        {/* 如果 tag == diary 则替换成学习日记，以此类推 */}
                                        {tag === "diary" ? "学习日记" : tag === "share" ? "技术分享" : tag === "difficult" ? "疑难杂症" : tag === "other" ? "其他" : tag}
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