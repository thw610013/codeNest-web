import { useEffect, useState } from "react";
import { Flex, Radio, Typography, Divider, Spin } from "antd";
import { Link } from "react-router-dom";
import UniversalCard from "../../components/UniversalCard";
import { getQuestionBankList, type QuestionBank as QuestionBankType } from "../../api/question_bank_api";
import "./index.css";

const { Title, Text } = Typography;

export default function QuestionBank() {
    const [tags, setTags] = useState<string>("frontend");
    const [questionBanks, setQuestionBanks] = useState<QuestionBankType[]>([]);
    const [loading, setLoading] = useState(false);

    // 拉取后端数据
    useEffect(() => {
        setLoading(true);
        getQuestionBankList({ tags })
            .then((res) => {
                setQuestionBanks(res.records); // 这里拿的是 records 数组
            })
            .finally(() => {
                setLoading(false);
            });
    }, [tags]);

    return (
        <div style={{ width: "80%", margin: "0 auto", paddingTop: 20 }}>
            <Title level={2} style={{ color: "#1677ff", marginBottom: 8 }}>
                面试题库
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
                不刷题，心慌慌；刷多题，心舒畅
            </Text>

            <Divider style={{ margin: "16px 0" }} />

            <Radio.Group
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                buttonStyle="solid"
                style={{ marginBottom: 24 }}
            >
                <Radio.Button value="frontend">前端</Radio.Button>
                <Radio.Button value="backend">后端</Radio.Button>
                <Radio.Button value="database">数据库</Radio.Button>
                <Radio.Button value="operatingSystem">操作系统</Radio.Button>
                <Radio.Button value="networking">网络</Radio.Button>
                <Radio.Button value="algorithm">算法</Radio.Button>
                <Radio.Button value="designPattern">设计模式</Radio.Button>
            </Radio.Group>

            {loading ? (
                <Spin style={{ display: "block", marginTop: 40 }} />
            ) : (
                <Flex wrap="wrap" gap="20px" justify="flex-start">
                    {questionBanks.map((question) => (
                        <Link
                            key={question.id}
                            to={`/questionbank/questions/${question.id}`}
                            style={{ display: 'inline-block' }}
                        >
                            <UniversalCard
                                title={question.title}
                                description={question.description}
                                image={question.imageUrl || "https://via.placeholder.com/240x140"}
                                width="250px"
                                pictureWidth="250px"
                                pictureHeight="200px"
                            />
                        </Link>
                    ))}
                </Flex>
            )}
        </div>
    );
}