import { Space, Card, Button, Tag, Typography, Divider, List, Avatar, Input, message, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { LikeOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import MdViewer from "../../../../components/MdViewer";
import { getQuestionById, type Question } from "../../../../api/question_api.ts";
import { useParams } from 'react-router-dom';
import { createContentVisitLog, getVisitLogsByQuestionId } from "../../../../api/content_visit_log_api";
import { getLikeByTarget } from "../../../../api/like_record_api";
import LikeButton from "../../../../components/LikeButton";

export default function QuestionDetails() {
    const { Title, Text, Paragraph } = Typography;
    const { TextArea } = Input;
    const params = useParams<{ id: string }>();
    const id = Number(params.id);
    const navigate = useNavigate();

    const [question, setQuestion] = useState<Question | null>(null);
    const [visitCount, setVisitCount] = useState<number>(0);
    const [comments, setComments] = useState([
        { id: 1, author: "小明", content: "这题有点意思！", time: "2025-08-09" },
        { id: 2, author: "小红", content: "答案写得很详细，学到了。", time: "2025-08-09" }
    ]);
    const [newComment, setNewComment] = useState("");
    const [nickname, setNickname] = useState("");
    const [likeCount, setLikeCount] = useState<number>(0);

    const handleSubmitComment = () => {
        if (!nickname.trim()) {
            message.warning("请输入昵称");
            return;
        }
        if (!newComment.trim()) {
            message.warning("请输入评价内容");
            return;
        }
        setComments(prev => [
            { id: Date.now(), author: nickname, content: newComment, time: new Date().toISOString().split("T")[0] },
            ...prev
        ]);
        setNewComment("");
        setNickname("");
        message.success("评价已发表");
    };

    useEffect(() => {
        getQuestionById(id)
            .then(data => {
                setQuestion({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    answer: data.answer,
                    tags: typeof data.tags === 'string' ? data.tags.split(',') : data.tags || [],
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    viewCount: data.viewCount,
                });

                createContentVisitLog({ visitDate: new Date().toISOString().split("T")[0], questionId: data.id })
                    .catch(err => console.error('访问日志记录失败', err));

                getVisitLogsByQuestionId(data.id)
                    .then(logs => setVisitCount(logs.length))
                    .catch(err => console.error('访问日志记录获取失败', err));
            });

        getLikeByTarget("2", id).then(data => setLikeCount(data || 0));
    }, [id]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
                minHeight: '100vh', // 高度占满视口
            }}
        >
            <Space
                direction="vertical"
                style={{
                    width: '100%',
                    maxWidth: 900, // 最大宽度限制，保持页面居中
                }}
            >
                {/* 顶部导航按钮 */}
                <Row gutter={[8, 8]}>
                    <Col>
                        <Button onClick={() => navigate('/questionbank')}>返回</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => navigate(`/questionbank/questiondetails/${Number(question?.id) - 1}`)}>上一题</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => navigate(`/questionbank/questiondetails/${Number(question?.id) + 1}`)}>下一题</Button>
                    </Col>
                </Row>

                {/* 题目内容 */}
                <Card style={{ width: '100%' }}>
                    <Title level={3} style={{ marginBottom: 8 }}>{question?.name}</Title>
                    <Paragraph type="secondary">{question?.description}</Paragraph>
                    <Space wrap style={{ marginBottom: 16 }}>
                        {Array.isArray(question?.tags) ? question.tags.map(tag => (
                            <Tag color="blue" key={tag}>{tag}</Tag>
                        )) : <Tag color="blue">{question?.tags}</Tag>}
                    </Space>
                    <Text type="secondary">
                        创建时间：{question?.createdAt} ｜ 更新时间：{question?.updatedAt} ｜ 浏览：{visitCount} ｜ 点赞：{likeCount}
                    </Text>
                    <Divider />
                    <MdViewer value={question?.answer} />
                </Card>

                {/* 用户评价 */}
                <Card title="用户评价" style={{ width: '100%' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Row gutter={[8, 8]}>
                            <Col xs={24} sm={8}>
                                <Input
                                    placeholder="请输入你的昵称"
                                    value={nickname}
                                    onChange={e => setNickname(e.target.value)}
                                />
                            </Col>
                            <Col xs={24} sm={16}>
                                <TextArea
                                    rows={3}
                                    placeholder="写下你对本题的评价..."
                                    value={newComment}
                                    onChange={e => setNewComment(e.target.value)}
                                />
                            </Col>
                            <Col xs={24}>
                                <Button type="primary" onClick={handleSubmitComment}>发表评论</Button>
                            </Col>
                        </Row>
                    </Space>

                    <Divider />

                    <List
                        dataSource={comments}
                        renderItem={item => (
                            <List.Item actions={[<span key="like"><LikeOutlined /> 赞</span>]}>
                                <List.Item.Meta
                                    avatar={<Avatar style={{ backgroundColor: '#87d068' }}>{item.author[0]}</Avatar>}
                                    title={<Text strong>{item.author}</Text>}
                                    description={
                                        <div>
                                            <Paragraph style={{ marginBottom: 4 }}>{item.content}</Paragraph>
                                            <Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Card>

                <LikeButton
                    targetId={String(id)}
                    targetType="2"
                    onSuccess={() => {
                        getLikeByTarget("2", id).then(data => setLikeCount(data || 0));
                    }}
                />
            </Space>
        </div>
    );
}