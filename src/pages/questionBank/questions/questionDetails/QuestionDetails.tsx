import { Space, Card, Button, Tag, Typography, Divider, List, Avatar, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LikeOutlined } from "@ant-design/icons";
import { useState } from "react";
import MdViewer from "../../../../components/MdViewer";
import { getQuestionById, type Question } from "../../../../api/question_api.ts";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { createContentVisitLog, getVisitLogsByQuestionId } from "../../../../api/content_visit_log_api"
import { getLikeByTarget } from "../../../../api/like_record_api"
import LikeButton from "../../../../components/LikeButton";
export default function QuestionDetails() {
    const { Title, Text, Paragraph } = Typography;
    const { TextArea } = Input;
    const params = useParams<{ id: string }>();
    const id = Number(params.id); // id 是字符串类型，如果你需要数字，记得转型 Number(id)
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question | null>(null);
    const [visitCount, setVisitCount] = useState<number>(0); // 浏览量统计
    const [comments, setComments] = useState([
        { id: 1, author: "小明", content: "这题有点意思！", time: "2025-08-09" },
        { id: 2, author: "小红", content: "答案写得很详细，学到了。", time: "2025-08-09" }
    ]);
    const [newComment, setNewComment] = useState("");
    const [nickname, setNickname] = useState("");
    const [likeCount, setLikeCount] = useState<number>(0); // 点赞量统计
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
                // 这里 data 是接口返回的Question对象，字段名要对应后端
                setQuestion({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    answer: data.answer,
                    tags: typeof data.tags === 'string' ? data.tags.split(',') : data.tags || [],
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt, // 有的接口字段是updatedAt，有的是updateAt
                    viewCount: data.viewCount,
                });
                // 记录访问日志
                createContentVisitLog({
                    visitDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD
                    questionId: data.id
                })
                    .then(() => console.log('访问日志记录成功'))
                    .catch(err => console.error('访问日志记录失败', err));
                //查询访问日志
                getVisitLogsByQuestionId(data.id).then((logs) => {
                    setVisitCount(logs.length); // 如果要去重可以在后端处理
                })
                    .then(() => console.log('访问日志记录获取成功'))
                    .catch(err => console.error('访问日志记录获取失败', err));
            })

        //4.查询点赞数量
        getLikeByTarget("2", Number(id)).then((data) => {
            setLikeCount(data || 0);
        });
    }, [id]);

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
                <Button onClick={() => navigate('/questionbank')}>返回</Button>
                <Button onClick={() => navigate(`/questionbank/questiondetails/${Number(question?.id) - 1}`)}>上一题</Button>
                <Button onClick={() => navigate(`/questionbank/questiondetails/${Number(question?.id) + 1}`)}>下一题</Button>
            </Space>

            <Card>
                <Title level={3} style={{ marginBottom: 8 }}>{question?.name}</Title>
                <Paragraph type="secondary">{question?.description}</Paragraph>
                <Space style={{ marginBottom: 16 }}>
                    {Array.isArray(question?.tags) ? question.tags.map((tag: string) => (
                        <Tag color="blue" key={tag}>{tag}</Tag>
                    )) : (
                        <Tag color="blue">{question?.tags}</Tag>
                    )}
                </Space>
                <Text type="secondary">
                    创建时间：{question?.createdAt} ｜ 更新时间：{question?.updatedAt} ｜ 浏览：{visitCount} ｜ 点赞：{likeCount}
                </Text>
                <Divider />
                <MdViewer value={question?.answer} />
            </Card>

            <Card title="用户评价" >
                {/* 发表评论 */}
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Input
                        placeholder="请输入你的昵称"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <TextArea
                        rows={3}
                        placeholder="写下你对本题的评价..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button type="primary" onClick={handleSubmitComment}>发表评论</Button>
                </Space>

                <Divider />

                {/* 评论列表 */}
                <List
                    dataSource={comments}
                    renderItem={item => (
                        <List.Item
                            actions={[<span key="like"><LikeOutlined /> 赞</span>]}
                        >
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
                    // 点赞成功后，刷新最新点赞数量
                    getLikeByTarget("2", Number(id)).then(data => {
                        setLikeCount(data || 0);
                    });
                }}
            />
        </Space>
    );
}