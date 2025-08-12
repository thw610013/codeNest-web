// components/carouseDiv/CarouselDiv.tsx
import React from 'react';
import { Carousel } from 'antd';
import CardComponent from '../Card';
import './CarouselDiv.css';
import { type CardData } from '../Card';

interface CarouselDivProps {
    group1Cards: CardData[];
    group2Cards: CardData[];
    group3Cards: CardData[];
}

const CarouselDiv: React.FC<CarouselDivProps> = ({ group1Cards, group2Cards, group3Cards }) => (
    <Carousel className="bar-dots-carousel" autoplay={true} autoplaySpeed={3000}>
        <div>
            <div style={{ width: "100%" }}>
                <CardComponent cards={group1Cards} />
            </div>
        </div>

        <div>
            <div style={{ width: "100%" }}>
                <CardComponent cards={group2Cards} />
            </div>
        </div>

        <div>
            <div style={{ width: "100%" }}>
                <CardComponent cards={group3Cards} />
            </div>
        </div>
    </Carousel>
);

export default CarouselDiv;