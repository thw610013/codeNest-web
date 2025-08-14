import { Card, Avatar, Tag, Row, Col, Divider, Space } from "antd";
import {
    MailOutlined,
    GithubOutlined,
    LinkedinOutlined,
    CodeOutlined,
} from "@ant-design/icons";

export default function About() {
    return (
        <div style={{ width: "80%", margin: "0 auto", paddingTop: 20 }}>
            <Row gutter={[16, 16]}>
                {/* 左侧个人信息 */}
                <Col xs={24} sm={8}>
                    <Card bordered style={{ textAlign: "center" }}>
                        <Avatar
                            size={120}
                            src="https://codenest.oss-cn-qingdao.aliyuncs.com/my_image/%E6%88%AA%E5%B1%8F2025-08-11%2021.20.41.png"
                            style={{ marginBottom: 16 }}
                        />
                        <h2 style={{ marginBottom: 8 }}>Eee_Tian</h2>
                        <p style={{ color: "rgba(0,0,0,0.65)" }}>全栈开发工程师</p>
                        <Divider />
                        <p>
                            <MailOutlined /> eee_tian@163.com
                        </p>
                        <p>
                            <GithubOutlined />{" "}
                            <a href="https://github.com/thw610013" target="_blank" rel="noreferrer">
                                github.com/thw610013
                            </a>
                        </p>
                        <p>
                            <LinkedinOutlined />{" "}
                            <a href="http://www.codenest.com.cn" target="_blank" rel="noreferrer">
                                www.codenest.com.cn
                            </a>
                        </p>
                    </Card>
                </Col>

                {/* 右侧详细介绍 */}
                <Col xs={24} sm={16}>
                    <Card title="关于我" bordered>
                        <p>
                            一名热爱技术、专注于后端开发的程序员，毕业于青岛城市学院。
                            目前在互联网行业工作，熟悉 Java、Spring Boot、Spring Cloud、
                            Docker 等技术栈。目标是进入大厂，成为架构师并持续探索高性能系统与优雅的代码设计。

                        </p>
                    </Card>

                    <Card title="擅长的技术栈" style={{ marginTop: 16 }}>
                        <Space wrap size="middle">
                            <Tag color="blue"><CodeOutlined /> Java</Tag>
                            <Tag color="geekblue"><CodeOutlined /> Spring Boot</Tag>
                            <Tag color="cyan"><CodeOutlined /> Spring Cloud</Tag>
                            <Tag color="volcano"><CodeOutlined /> Vue3</Tag>
                            <Tag color="gold"><CodeOutlined /> React</Tag>
                            <Tag color="green"><CodeOutlined /> Docker</Tag>
                            <Tag color="purple"><CodeOutlined /> MySQL</Tag>
                            <Tag color="magenta"><CodeOutlined /> Redis</Tag>
                            <Tag color="lime"><CodeOutlined /> Nacos</Tag>
                            <Tag color="orange"><CodeOutlined /> Elasticsearch</Tag>
                            <Tag color="geekblue"><CodeOutlined /> PostgreSQL</Tag>
                            <Tag color="cyan"><CodeOutlined /> JVM 调优</Tag>
                            <Tag color="red"><CodeOutlined /> RabbitMQ</Tag>
                            <Tag color="gold"><CodeOutlined /> RESTful API 设计</Tag>
                            <Tag color="purple"><CodeOutlined /> 微服务架构</Tag>
                            <Tag color="green"><CodeOutlined /> CI/CD 流水线</Tag>
                        </Space>
                    </Card>

                    <Card title="个人爱好" style={{ marginTop: 16 }}>
                        <p>🏃‍♂️ 跑步，🎬 看电影，📚 学习新技术，💻 参与开源项目，🎮 玩游戏放松，🧘‍♂️ 健身与冥想</p>
                    </Card>

                    <Card title="职业目标" style={{ marginTop: 16 }}>
                        <p>
                            🚀 进入互联网大厂，参与核心系统设计与研发，提升架构设计能力。<br />
                            🛠 持续精进技术，掌握分布式、高并发和容器编排，构建高性能系统。<br />
                            🎯 35 岁前稳固技术与管理双重能力，实现从研发到架构师/技术管理的转型。<br />
                            🌱 注重团队协作和知识分享，打造可持续发展的高效技术团队。
                        </p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}