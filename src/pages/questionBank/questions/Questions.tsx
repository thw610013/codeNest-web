import { Card, Avatar, Space, Table, Button, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionBankById } from "../../../api/question_bank_api";
import { getQuestionsByBankId } from "../../../api/question_bank_question_api";
import type { QuestionBank } from "../../../api/question_bank_api";
import type { QuestionBankQuestion } from "../../../api/question_bank_question_api";
import "./index.css";

export default function Questions() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [questionBankInfo, setQuestionBankInfo] = useState<QuestionBank | null>(null);
    const [questionList, setQuestionList] = useState<QuestionBankQuestion[]>([]);

    const tableColumns = [
        { title: "题目", dataIndex: "name", key: "name", className: "question-title" },
        { title: "难度", dataIndex: "difficulty", key: "difficulty" },
        { title: "创建时间", dataIndex: "createdAt", key: "createdAt" },
        { title: "更新时间", dataIndex: "updateAt", key: "updateAt" },
    ];

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
        <Space direction="vertical" style={{ width: "100%" }}>
            {/* 按钮组 */}
            <Space wrap>
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

            <Row gutter={[16, 16]}>
                {/* 题库信息 */}
                <Col xs={24} md={8}>
                    <Card loading={loading}>
                        {questionBankInfo && (
                            <Card.Meta
                                avatar={
                                    <Avatar
                                        src={questionBankInfo.imageUrl}
                                        style={{ width: 80, height: 80 }}
                                    />
                                }
                                title={questionBankInfo.title}
                                description={
                                    <>
                                        <p>{questionBankInfo.description}</p>
                                    </>
                                }
                            />
                        )}
                    </Card>
                </Col>

                {/* 题目列表 */}
                <Col xs={24} md={16}>
                    <Card>
                        <Table
                            loading={loading}
                            dataSource={questionList}
                            pagination={false}
                            rowKey="id"
                            columns={tableColumns}
                            scroll={{ x: 600 }}
                            onRow={(record) => ({
                                onClick: () =>
                                    navigate(`/questionbank/questiondetails/${record.id}`),
                            })}
                        />
                    </Card>
                </Col>
            </Row>
        </Space>
    );
}