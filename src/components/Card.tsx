import React from 'react';
import { Card, Avatar, Flex } from 'antd';

export interface CardData {
    id: number;
    title: string;
    image: string;
    description?: string;
    type: 'tool' | 'website' | 'article';
    linkUrl: string;
}

export interface CardComponentProps {
    cards: CardData[];
}

const CardComponent: React.FC<CardComponentProps> = ({ cards }) => {

    const handleClick = (card: CardData) => {
        if (card.type === 'website') {
            // 直接跳转数据库中linkUrl
            window.open(card.linkUrl, '_blank');
        } else if (card.type === 'tool') {
            // 跳转本网站工具页面，假设linkUrl存的是id（比如 "1"）
            window.location.href = `${window.location.origin}/tools/${card.linkUrl}`;
        }
    };

    return (
        <>
            <style>{`
                .card-hover:hover .ant-card-meta-title {
                    color: #0274F9 !important;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
            `}</style>
            <Flex gap="large" align="start" justify="space-around" style={{ padding: '20px 0' }}>
                {cards.map(card => (
                    <Card
                        key={card.id}
                        className="card-hover"
                        style={{ width: 300, background: '#F2F7FF', cursor: 'pointer' }}
                        hoverable
                        onClick={() => handleClick(card)}
                    >
                        <Card.Meta
                            avatar={<Avatar src={card.image} />}
                            title={card.title}
                            description={
                                <div>
                                    {card.description
                                        ? card.description.split('\n').map((line, idx) => <p key={idx}>{line}</p>)
                                        : '暂无描述'}
                                </div>
                            }
                        />
                    </Card>
                ))}
            </Flex>
        </>
    );
};

export default CardComponent;