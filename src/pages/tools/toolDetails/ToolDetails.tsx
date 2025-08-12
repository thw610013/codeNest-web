import { useParams } from "react-router-dom";
import { Card, Avatar, Tag, Button, Space, Row } from "antd";
import MdViewer from "../../../components/MdViewer";
import { useState, useEffect } from "react";
import { getToolById, type ToolInfo } from "../../../api/tools_api";

export default function ToolDetails() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [tool, setTool] = useState<ToolInfo | null>(null);
    // const [otherTools, setOtherTools] = useState<Tool[]>([]);

    const otherTools = [
        {
            id: '2',
            name: 'VSCode',
            image_url: 'https://codenest.oss-cn-qingdao.aliyuncs.com/tool_images/vscodeLogo.jpeg',
            description: '全能编辑器',
        }
    ]

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        // 获取当前工具详情
        getToolById(Number(id))
            .then(res => {
                setTool(res);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    return (
        <div>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {/* header */}
                <Card loading={loading} >
                    <Card.Meta
                        avatar={
                            <Avatar src={tool?.imageUrl || ''}
                                style={{ width: 100, height: 100 }}
                            />}
                        title={<div style={{ fontSize: 25, fontWeight: 'bold' }}>{tool?.name || ''}</div>}
                        description={
                            <>
                                <p>{tool?.description || ''}</p>
                                <p>
                                    <Tag color="blue">{tool?.version || ''}</Tag>
                                    <Tag color="green">下载次数{tool?.usageCount || ''}</Tag>
                                    <Tag color="purple">{tool?.tags || ''}</Tag>
                                </p>
                                <p>
                                    <span>前往官网下载：</span>
                                    <Button
                                        size="small"
                                        type="default"
                                        href={tool?.redirectUrl || ''}
                                        target="_blank"
                                    >
                                        下载
                                    </Button>
                                </p>
                            </>
                        }
                    />
                </Card>

                {/* content */}
                <Card>
                    <MdViewer value={tool?.content || "暂无详细介绍"} />
                </Card>

                <Card>
                    <Row align="middle" justify="start">
                        <span style={{ fontSize: 14, marginRight: '20px' }}>其他推荐：</span>
                        <Card style={{ width: 250, height: 100 }} hoverable={true}>
                            <Card.Meta
                                avatar={
                                    <Avatar src={otherTools[0].image_url}
                                        style={{ width: '30px', height: '30px' }}
                                    />}
                                title={otherTools[0].name}
                                description={
                                    <>
                                        <p>{otherTools[0].description}</p>
                                    </>
                                }
                            />
                        </Card>
                    </Row>
                </Card>
            </Space>
        </div >
    );
}