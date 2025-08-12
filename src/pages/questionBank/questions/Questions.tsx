import { Card, Avatar, Space, Table, Button } from "antd";
import { useState, useEffect } from "react";
// import { CalendarOutlined, EyeOutlined, FileTextOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionBankById } from "../../../api/question_bank_api";
import { getQuestionsByBankId } from "../../../api/question_bank_question_api";
import type { QuestionBank } from "../../../api/question_bank_api";
import type { QuestionBankQuestion } from "../../../api/question_bank_question_api";
import "./index.css";

export default function Questions() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // 从路由获取题库 ID
    const [loading, setLoading] = useState<boolean>(false);
    const [questionBankInfo, setQuestionBankInfo] = useState<QuestionBank | null>(null);
    const [questionList, setQuestionList] = useState<QuestionBankQuestion[]>([]);

    // 表格列
    const tableColumns = [
        {
            title: "题目",
            dataIndex: "name",
            key: "name",
            className: "question-title",
        },
        {
            title: "难度",
            dataIndex: "difficulty",
            key: "difficulty",
        },
        {
            title: "创建时间",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "更新时间",
            dataIndex: "updateAt",
            key: "updateAt",
        },
    ];

    // 获取题库详情和题目列表
    useEffect(() => {
        if (!id) return;
        setLoading(true);

        Promise.all([
            getQuestionBankById(Number(id)),
            getQuestionsByBankId(Number(id)),
        ])
            .then(([bankRes, questionsRes]) => {
                setQuestionBankInfo(bankRes);
                setQuestionList(questionsRes);
            })
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Space>
                    <Button type="default" onClick={() => navigate("/questionbank")}>
                        返回
                    </Button>
                    <Button
                        type="default"
                        onClick={() =>
                            navigate(`/questionbank/questions/${Number(id) - 1}`)
                        }
                        disabled={!id || Number(id) <= 1}
                    >
                        上一题库
                    </Button>
                    <Button
                        type="default"
                        onClick={() =>
                            navigate(`/questionbank/questions/${Number(id) + 1}`)
                        }
                    >
                        下一题库
                    </Button>
                </Space>

                {/* 题库信息 */}
                <Card loading={loading} style={{ minWidth: 300 }}>
                    {questionBankInfo && (
                        <Card.Meta
                            avatar={
                                <Avatar
                                    src={questionBankInfo.imageUrl}
                                    style={{ width: 100, height: 100 }}
                                />
                            }
                            title={questionBankInfo.title}
                            description={
                                <>
                                    <p>{questionBankInfo.description}</p>
                                    <Space>
                                        <span>
                                            {/* <EyeOutlined /> {questionBankInfo.views} */}
                                        </span>
                                        <span>
                                            {/* <FileTextOutlined /> {questionBankInfo.total} */}
                                        </span>
                                        <span>
                                            {/* <CalendarOutlined /> {questionBankInfo.updatedAt} */}
                                        </span>
                                    </Space>
                                </>
                            }
                        />
                    )}
                </Card>

                {/* 题目列表 */}
                <Card>
                    <Table
                        loading={loading}
                        dataSource={questionList}
                        pagination={false}
                        rowKey="id"
                        columns={tableColumns}
                        onRow={(record) => ({
                            onClick: () =>
                                navigate(`/questionbank/questiondetails/${record.id}`),
                        })}
                    />
                </Card>
            </Space>
        </div>
    );
}