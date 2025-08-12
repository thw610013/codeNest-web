import React from 'react';
import { Card } from 'antd';

interface ToolCardProps {
    title: string;
    description: string;
    image: string;
    width: string;
    pictureWidth: string;
    pictureHeight: string;

}

const { Meta } = Card;

const ToolCard: React.FC<ToolCardProps> = ({ title, description, image, width, pictureWidth, pictureHeight }) => (
    <Card
        hoverable
        style={{ width: width }}
        cover={<img alt="example" src={image} style={{ width: pictureWidth, height: pictureHeight }} />}

    >
        <Meta title={title} description={description} />
    </Card>
);

export default ToolCard;