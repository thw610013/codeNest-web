import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import type { FormProps } from "antd";
import MdEditor from "../../../components/mdEditor/MdEditor";

type FieldType = {
    title: string;
    content: string;
};

const ArticleManage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<FieldType>();

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("提交成功:", values);
        // TODO: 在这里调用后端 API 保存文章
        setIsModalOpen(false);
        form.resetFields();
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("校验失败:", errorInfo);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                新增文章
            </Button>

            <Modal
                title="新增文章"
                open={isModalOpen}
                onCancel={handleCancel}
                okText="提交"
                cancelText="取消"
                onOk={() => form.submit()} // 点击“提交”时触发表单提交
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
                        <Input placeholder="请输入标签" />
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
        </div>
    );
};

export default ArticleManage;