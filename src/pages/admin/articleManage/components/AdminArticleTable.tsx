import React, { useEffect } from 'react';
import { Space, Table, Tag, Button, message, Modal, Form, Input, Tabs, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import { type Article, getArticleList, updateArticle, deleteArticle, searchArticles } from '../../../../api/adminApi/admin_articleManage_api';
import { useState } from 'react';
import MdViewer from '../../../../components/MdViewer';
import MdEditor from '../../../../components/mdEditor/MdEditor';
import { tagMap } from '../../../../components/TagMap';

type ArticleTableProps = {
    filterTag?: string;
    onTagClick?: (tag: string) => void;
};

const createColumns = (onClickTag?: (tag: string) => void): NonNullable<TableProps<Article>['columns']> => [
    {
        title: '文章题目',
        dataIndex: 'title',
        key: 'title',
        ellipsis: true,
    },
    {
        title: '文章标签',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, record) => {
            const tagsArray = (record.tags ?? '')
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean);
            return (
                <>
                    {tagsArray.map((tag) => {
                        const { label, color } = tagMap[tag] ?? { label: tag, color: "gray" };
                        return (
                            <Tag
                                color={color}
                                key={tag}
                                style={{ cursor: onClickTag ? "pointer" : undefined }}
                                onClick={() => onClickTag?.(tag)}
                            >
                                {label}
                            </Tag>
                        );
                    })}
                </>
            );
        },
    },
    {
        title: '文章内容概述',
        key: 'summary',
        render: (_, record) => {
            const text = record.summary ?? record.content ?? '';
            if (!text) return '';
            return text.length > 120 ? `${text.slice(0, 120)}...` : text;
        },
        ellipsis: true,
    },
    {
        title: '发布时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
    },
    {
        title: '操作',
        key: 'action',
        render: () => null, // 真正的操作列在组件中通过 expandable/rowSelection 不好放，这里占位，稍后用 column render 在组件内覆写
    },
];

const App: React.FC<ArticleTableProps> = ({ filterTag, onTagClick }) => {
    const [data, setData] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    // 编辑相关
    const [editOpen, setEditOpen] = useState(false);
    const [current, setCurrent] = useState<Article | null>(null);
    const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');

    const [form] = Form.useForm<Article>();

    const fetchList = (tag?: string) => {
        setLoading(true);
        const request = tag && tag !== 'all'
            ? searchArticles({ tag })
            : getArticleList();
        request.then((res) => {
            setData(res);
        })
            .catch((err) => {
                console.error(err);
                message.error('获取文章列表失败');
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchList(filterTag);
    }, [filterTag]);

    const handleTagClick = (tag: string) => {
        if (onTagClick) {
            onTagClick(tag);
        } else {
            fetchList(tag);
        }
    };

    const handleOpenEdit = (record: Article) => {
        setCurrent(record);
        setActiveTab('preview');
        setEditOpen(true);
        form.setFieldsValue({
            id: record.id as number,
            title: record.title,
            tags: record.tags,
            content: record.content,
        });
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            if (!current?.id) {
                message.error('缺少文章 ID，无法保存');
                return;
            }
            await updateArticle(current.id, {
                title: values.title,
                tags: values.tags,
                content: values.content,
            });
            message.success('保存成功');
            setEditOpen(false);
            fetchList();
        } catch {
            // 校验失败或请求失败
        }
    };

    const handleDelete = async (record: Article) => {
        if (!record.id) {
            message.error('缺少文章 ID，无法删除');
            return;
        }
        try {
            await deleteArticle(record.id);
            message.success('已删除');
            fetchList();
        } catch {
            message.error('删除失败');
        }
    };

    const actionRender = (_: unknown, record: Article) => (
        <Space size="middle">
            <Button type="default" onClick={() => handleOpenEdit(record)}>
                编辑
            </Button>
            <Popconfirm
                title="删除文章"
                description="确认删除该文章吗？"
                onConfirm={() => handleDelete(record)}
            >
                <Button danger type="default">删除</Button>
            </Popconfirm>
            <Button type="default" onClick={() => message.info('置顶功能待实现')}>置顶</Button>
        </Space>
    );

    const baseColumns = createColumns(handleTagClick);
    const finalColumns: NonNullable<TableProps<Article>['columns']> = baseColumns.map((c) =>
        c.key === 'action' ? { ...c, render: actionRender } : c
    );

    const contentValue = Form.useWatch('content', form);

    return (
        <>
            <Table<Article>
                columns={finalColumns}
                dataSource={data}
                rowKey={(record) => String(record.id ?? record.title)}
                loading={loading}
                pagination={{ pageSize: 10, showSizeChanger: false }}
                scroll={{ x: true }}
            />

            <Modal
                title={current ? `编辑：${current.title}` : '编辑文章'}
                open={editOpen}
                onCancel={() => setEditOpen(false)}
                width={960}
                footer={[
                    <Button key="cancel" onClick={() => setEditOpen(false)}>取消</Button>,
                    <Button key="save" type="primary" onClick={handleSave}>保存</Button>,
                ]}
            >
                <Tabs
                    activeKey={activeTab}
                    onChange={(k) => setActiveTab(k as 'preview' | 'edit')}
                    items={[
                        { key: 'preview', label: '预览', children: <div style={{ minHeight: 300 }}><MdViewer value={contentValue} /></div> },
                        {
                            key: 'edit',
                            label: '编辑',
                            children: (
                                <Form form={form} layout="vertical">
                                    <Form.Item name="title" label="文章题目" rules={[{ required: true, message: '请输入文章题目' }]}>
                                        <Input placeholder="请输入标题" />
                                    </Form.Item>
                                    <Form.Item name="tags" label="文章标签" rules={[{ required: true, message: '请输入文章标签' }]}>
                                        <Input placeholder="请输入标签，多个用逗号隔开" />
                                    </Form.Item>
                                    <Form.Item name="content" label="文章内容" rules={[{ required: true, message: '请输入文章内容' }]}>
                                        <MdEditor placeholder="请输入文章内容" />
                                    </Form.Item>
                                </Form>
                            ),
                        },
                    ]}
                />
            </Modal>
        </>
    );
};

export default App;