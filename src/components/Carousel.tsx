import React from 'react';
import { Carousel } from 'antd';
import codeBackground4 from '../assets/codeBackground4.jpg';
import codeBackground2 from '../assets/codeBackground2.png';
import codeBackground3 from '../assets/codeBackground3.png';

const CarouselComponent: React.FC = () => (

    <Carousel autoplay effect="fade" arrows={true}>
        <div >
            <img src={codeBackground4} alt='codeBackground1' style={{ width: "100%", height: "920px" }} />
        </div>
        <div >
            <img src={codeBackground2} alt='codeBackground2' style={{ width: "100%", height: "920px" }} />
        </div>
        <div >
            <img src={codeBackground3} alt='codeBackground3' style={{ width: "100%", height: "920px" }} />
        </div>
    </Carousel>
);

export default CarouselComponent;