import { useEffect, useState } from "react";
import { Typography, Divider, Spin, Radio, Row, Col } from "antd";
import { Link } from "react-router-dom";
import UniversalCard from "../../components/UniversalCard";
import { getQuestionBankList, type QuestionBank as QuestionBankType } from "../../api/question_bank_api";
import "./index.css";

const { Title, Text } = Typography;

export default function QuestionBank() {
    const [tags, setTags] = useState<string>("frontend");
    const [questionBanks, setQuestionBanks] = useState<QuestionBankType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getQuestionBankList({ tags })
            .then(res => setQuestionBanks(res.records))
            .finally(() => setLoading(false));
    }, [tags]);

    return (
        <div style={{ width: "95%", maxWidth: 1200, margin: "0 auto", paddingTop: 20 }}>
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
                style={{ marginBottom: 24, flexWrap: 'wrap', display: 'flex', gap: 8 }}
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
                <Row gutter={[16, 16]}>
                    {questionBanks.map((question) => (
                        <Col
                            key={question.id}
                            xs={24}      // 手机端一行一列
                            sm={12}      // 小屏幕两列
                            md={8}       // 中屏幕三列
                            lg={6}       // 大屏幕四列
                        >
                            <Link
                                to={`/questionbank/questions/${question.id}`}
                                style={{ display: 'block' }}
                            >
                                <UniversalCard
                                    title={question.title}
                                    description={question.description}
                                    image={question.imageUrl || "https://via.placeholder.com/240x140"}
                                    width="100%"              // 自适应Col宽度
                                    pictureWidth="100%"       // 图片自适应
                                    pictureHeight="160px"     // 固定高度，避免拉伸
                                />
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}