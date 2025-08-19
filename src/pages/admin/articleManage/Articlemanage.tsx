import { Button, Flex, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import type { FormProps } from "antd";
import MdEditor from "../../../components/mdEditor/MdEditor";
import { createArticle } from "../../../api/adminApi/admin_articleManage_api";
import AdminArticleTable from "./components/AdminArticleTable";

type FieldType = {
    title: string;
    content: string;
    tags?: string;
};

const ArticleManage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<FieldType>();
    const [loading, setLoading] = useState(false);
    const { Search } = Input;

    const showModal = () => setIsModalOpen(true);
    const handleOk = () => form.submit();
    const handleCancel = () => setIsModalOpen(false);

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        console.log("提交成功:", values);
        setLoading(true);
        try {
            await createArticle({
                title: values.title,
                content: values.content,
                tags: values.tags,
                author: "管理员", // 这里可以根据登录信息自动填充
                status: 1,        // 默认状态，比如 1=已发布
            });

            message.success("文章创建成功 🎉");
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error("创建失败:", error);
            message.error("文章创建失败，请稍后重试");
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("校验失败:", errorInfo);
    };

    const onSearch = (value: string) => {
        console.log("搜索:", value);
    };

    return (
        <div>

            <Flex vertical gap={16}>

                <Flex justify="space-between">
                    <Button type="primary" onClick={showModal}>
                        新增文章
                    </Button>
                    <Search placeholder="输入文章标题" onSearch={onSearch} enterButton
                        style={{ width: '300px' }} />
                </Flex>
                <AdminArticleTable />

                <Modal
                    title="新增文章"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    okText="提交"
                    cancelText="取消"
                    onOk={handleOk}
                    confirmLoading={loading} // 提交时按钮 loading 状态
                >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="文章题目"
                            name="title"
                            rules={[{ required: true, message: "请输入文章题目" }]}
                        >
                            <Input placeholder="请输入标题" />
                        </Form.Item>

                        <Form.Item
                            label="文章标签"
                            name="tags"
                            rules={[{ required: true, message: "请输入文章标签" }]}
                        >
                            <Input placeholder="请输入标签，多个用逗号隔开" />
                        </Form.Item>

                        <Form.Item
                            label="文章内容"
                            name="content"
                            rules={[{ required: true, message: "请输入文章内容" }]}
                        >
                            <MdEditor placeholder="请输入文章内容" />
                        </Form.Item>
                    </Form>
                </Modal>

            </Flex>

        </div>
    );
};

export default ArticleManage;