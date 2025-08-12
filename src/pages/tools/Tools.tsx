import ToolCard from "../../components/UniversalCard";
import { Flex } from "antd";
import "./index.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getToolList, type ToolInfo } from '../../api/tools_api';

export default function Tool() {

    const [tools, setTools] = useState<ToolInfo[]>([]);

    useEffect(() => {
        getToolList({ page: 1, size: 20 })
            .then(data => {
                setTools(data);
            })
            .catch(err => {
                console.error('获取工具列表失败:', err);
            });
    }, []);
    return (
        <div>
            {/*  */}
            <h2 className="title">编程工具</h2>
            <p className="description">
                编程工具是程序员日常工作中必不可少的工具，它们可以帮助程序员更高效地完成工作。
            </p>
            <div style={{ width: "80%", margin: "2% auto" }}>
                <Flex
                    justify="space-around"
                    align="center"
                    wrap="wrap"
                    gap="20px"
                >
                    {tools.map((tool) => (
                        <div style={{ flex: "0 0 20%" }} key={tool.id}>
                            <Link to={`/tools/${tool.id}`}>
                                <ToolCard
                                    title={tool.name}                // 用你的接口字段 name 替换 title
                                    description={tool.description || ''}
                                    image={tool.imageUrl || ''}            // 这里 imageUrl 替换 image
                                    width="200px"
                                    pictureWidth="200px"
                                    pictureHeight="150px"
                                />
                            </Link>
                        </div>
                    ))}
                </Flex>
            </div>
            {/*  */}
            {/* <h2 className="title">编程网站</h2>
            <p className="description">
                编程网站是程序员日常工作中必不可少的网站，它们可以帮助程序员更高效地完成工作。
            </p>
            <div style={{ width: "80%", margin: "2% auto" }}>
                <Flex
                    justify="space-around"
                    align="center"
                    wrap="wrap"
                    gap="20px" // 间距
                >
                    {tools.map((tool) => (
                        <div style={{ flex: "0 0 20%" }} key={tool.title}>
                            <Link to={`/ToolDetails/${tool.id}`}>
                                <ToolCard
                                    title={tool.title}
                                    description={tool.description}
                                    image={tool.image}
                                    width="200px"
                                    pictureWidth="100%"
                                    pictureHeight="100%"
                                />
                            </Link>
                        </div>
                    ))}
                </Flex>
            </div> */}
            {/*  */}
            {/* <h2 className="title">Mac软件</h2>
            <p className="description">
                Mac软件是程序员日常工作中必不可少的软件，它们可以帮助程序员更高效地完成工作。
            </p>
            <div style={{ width: "80%", margin: "2% auto" }}>
                <Flex
                    justify="space-around"
                    align="center"
                    wrap="wrap"
                    gap="20px" // 间距
                >
                    {tools.map((tool) => (
                        <div style={{ flex: "0 0 20%" }} key={tool.title}>
                            <Link to={`/ToolDetails/${tool.id}`}>
                                <ToolCard
                                    title={tool.title}
                                    description={tool.description}
                                    image={tool.image}
                                    width="200px"
                                    pictureWidth="100%"
                                    pictureHeight="100%"
                                />
                            </Link>
                        </div>
                    ))}
                </Flex>
            </div> */}

        </div>
    )

}