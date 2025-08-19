import React, { useEffect } from 'react';
import { Space, Table, Tag, Button, message, Popconfirm, Avatar } from 'antd';
import type { TableProps } from 'antd';
import { type MessageBoard, getMessageBoardList, updateMessageBoard, deleteMessageBoard } from '../../../../api/adminApi/admin_messageManage_api';
import { useState } from 'react';

type MessageTableProps = Record<string, never>;

const columns: TableProps<MessageBoard>['columns'] = [
    {
        title: '留言id',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true,
    },
    {
        title: '留言回复 id',
        key: 'parentId',
        dataIndex: 'parentId',
    },

    {
        title: '留言头像',
        key: 'avatarUrl',
        dataIndex: 'avatarUrl',
        render: (url?: string) => (url ? <Avatar src={url} /> : <Avatar>U</Avatar>),
    },
    {
        title: '留言昵称',
        key: 'commenterName',
        dataIndex: 'commenterName',

    },
    {
        title: '留言内容',
        dataIndex: 'commentContent',
        key: 'commentContent',
        ellipsis: true,
    },
    {
        title: '留言时间',
        key: 'commentTime',
        dataIndex: 'commentTime',
    },
    {
        title: '是否删除',
        key: 'isDeleted',
        dataIndex: 'isDeleted',
        render: (v?: number) => (v ? <Tag color="red">已删除</Tag> : <Tag color="green">正常</Tag>),
    },
    // 0 未审核 1 审核通过
    {
        title: '是否通过审核',
        key: 'status',
        dataIndex: 'status',
        render: (v?: number) => (v === 1 ? <Tag color="blue">已通过</Tag> : <Tag>待审核</Tag>),
    },
    //  操作有 1，删除，2 编辑 3 审核通过
    {
        title: '操作',
        key: 'action',
        render: () => null, // 真正的操作列在组件中通过 expandable/rowSelection 不好放，这里占位，稍后用 column render 在组件内覆写
    },
];

const App: React.FC<MessageTableProps> = () => {
    const [data, setData] = useState<MessageBoard[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchList = () => {
        setLoading(true);
        getMessageBoardList()
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.error(err);
                message.error('获取留言列表失败');
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchList();
    }, []);

    // 去除编辑功能，保留删除与审核

    const handleDelete = async (record: MessageBoard) => {
        if (!record.id) {
            message.error('缺少留言 ID，无法删除');
            return;
        }
        try {
            await deleteMessageBoard(record.id);
            message.success('已删除');
            fetchList();
        } catch {
            message.error('删除失败');
        }
    };

    const handleApprove = async (record: MessageBoard) => {
        if (!record.id) return;
        try {
            await updateMessageBoard({ id: record.id, status: 1 });
            message.success('已通过审核');
            fetchList();
        } catch {
            message.error('审核失败');
        }
    };

    const actionRender = (_: unknown, record: MessageBoard) => (
        <Space size="middle">
            <Popconfirm
                title="删除留言"
                description="确认删除该留言吗？"
                onConfirm={() => handleDelete(record)}
            >
                <Button danger type="default">删除</Button>
            </Popconfirm>
            <Button type="default" disabled={record.status === 1} onClick={() => handleApprove(record)}>审核通过</Button>
        </Space>
    );

    const finalColumns: TableProps<MessageBoard>['columns'] = columns.map((c) =>
        c.key === 'action' ? { ...c, render: actionRender } : c
    );

    return (
        <>
            <Table<MessageBoard>
                columns={finalColumns}
                dataSource={data}
                rowKey={(record) => String(record.id)}
                loading={loading}
                pagination={{ pageSize: 10, showSizeChanger: false }}
                scroll={{ x: true }}
            />
        </>
    );
};

export default App;