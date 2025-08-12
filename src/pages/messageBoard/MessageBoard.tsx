import { useState, useEffect } from "react";
import { Card, Form, Input, Button, List, Avatar, message, Divider, Space, Modal } from "antd";
import { UserOutlined, PictureOutlined } from "@ant-design/icons";
import { getMessageBoardList, createMessageBoard, type MessageBoard } from "../../api/message_board_api";

export default function MessageBoardPage() {
    const [form] = Form.useForm();
    const [messages, setMessages] = useState<MessageBoard[]>([]);
    const [loading, setLoading] = useState(false);

    // 获取留言列表
    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await getMessageBoardList();
            setMessages(res || []);
        } catch (err) {
            message.error(`获取留言列表失败${err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // 提交留言
    const handleSubmit = async (values: { commenterName: string; avatarUrl?: string; commentContent: string }) => {
        if (!values.commenterName.trim() || !values.commentContent.trim()) {
            message.warning("请输入昵称和留言内容");
            return;
        }
        try {
            await createMessageBoard({
                commenterName: values.commenterName,
                avatarUrl: values.avatarUrl || "",
                commentContent: values.commentContent,
            });
            message.success("留言成功！");
            form.resetFields();
            fetchMessages();
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            message.error(`留言失败，请稍后重试${err}`);
        }
    };

    // 回复
    // 新增两个状态
    const [replyForm] = Form.useForm();
    const [replyModalVisible, setReplyModalVisible] = useState(false);
    const [currentReplyTarget, setCurrentReplyTarget] = useState<MessageBoard | null>(null);

    // 打开弹窗
    const openReplyModal = (item: MessageBoard) => {
        setCurrentReplyTarget(item);
        setReplyModalVisible(true);
    };

    // 提交回复
    const handleReplySubmit = async () => {
        try {
            const values = await replyForm.validateFields();
            await createMessageBoard({
                commenterName: values.replyName.trim(),
                commentContent: `回复 @${currentReplyTarget?.commenterName}：${values.replyContent.trim()}`,
                avatarUrl: "",
            });
            message.success("回复成功");
            setReplyModalVisible(false);
            replyForm.resetFields();
            fetchMessages();
        } catch (err) {
            if (err instanceof Error) {
                message.error(`回复失败: ${err.message}`);
            }
        }
    };

    return (
        <div style={{ width: "80%", margin: "0 auto", paddingTop: 20 }}>
            <h2 style={{ color: "#1677ff", marginBottom: 10 }}>💬 留言板</h2>
            <Divider style={{ margin: "10px 0" }} />

            {/* 输入区域 */}
            <Card
                bordered
                style={{ marginBottom: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ maxWidth: 600 }}>
                    <Form.Item
                        name="commenterName"
                        label="昵称"
                        rules={[{ required: true, message: "请输入昵称" }]}
                    >
                        <Input placeholder="请输入你的昵称" prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item name="avatarUrl" label="头像 URL（可选）">
                        <Input placeholder="请输入头像图片地址" prefix={<PictureOutlined />} />
                    </Form.Item>

                    <Form.Item
                        name="commentContent"
                        label="留言内容"
                        rules={[{ required: true, message: "请输入留言内容" }]}
                    >
                        <Input.TextArea placeholder="写下你想说的话..." rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            发布留言
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            {/* 留言列表 */}
            <List
                loading={loading}
                header={<div style={{ fontWeight: "bold" }}>所有留言（{messages.length}）</div>}
                bordered
                dataSource={messages}
                renderItem={(item, index) => {
                    const floorNumber = index + 1; // 最早 1 楼，依次递增
                    return (
                        <List.Item
                            style={{
                                backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                                borderRadius: 4,
                                padding: "12px 16px",
                            }}
                            actions={[
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => openReplyModal(item)}
                                >
                                    回复
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    item.avatarUrl ? (
                                        <Avatar src={item.avatarUrl} />
                                    ) : (
                                        <Avatar style={{ backgroundColor: "#1677ff" }}>
                                            {item.commenterName?.[0] || "匿"}
                                        </Avatar>
                                    )
                                }
                                title={
                                    <Space>
                                        <span style={{ fontWeight: 500 }}>{item.commenterName}</span>
                                        <span style={{ color: "#999", fontSize: 12 }}>{item.commentTime || ""}</span>
                                        <span style={{ color: "#1677ff", fontSize: 12 }}>
                                            {floorNumber}楼
                                        </span>
                                    </Space>
                                }
                                description={<div style={{ whiteSpace: "pre-wrap" }}>{item.commentContent}</div>}
                            />
                        </List.Item>
                    );
                }}
                style={{ background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
            />

            {/* 回复弹窗组件 */}
            <Modal
                title={`回复 ${currentReplyTarget?.commenterName || ""}`}
                open={replyModalVisible}
                onCancel={() => {
                    setReplyModalVisible(false);
                    replyForm.resetFields();
                }}
                onOk={handleReplySubmit}
                okText="提交"
                cancelText="取消"
            >
                <Form form={replyForm} layout="vertical">
                    <Form.Item
                        name="replyName"
                        label="您的名称"
                        rules={[{ required: true, message: "请输入您的名称" }]}
                    >
                        <Input placeholder="请输入您的名称" />
                    </Form.Item>
                    <Form.Item
                        name="replyContent"
                        label="回复内容"
                        rules={[{ required: true, message: "请输入回复内容" }]}
                    >
                        <Input.TextArea rows={4} placeholder="请输入回复内容" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}