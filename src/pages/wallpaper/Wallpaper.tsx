import ImageComponent from "./components/ImageComponent";
import "./index.css";
import { Flex } from "antd";

const demoUrls: string[] = [
    'https://w.wallhaven.cc/full/ox/wallhaven-oxr55p.jpg',
    'https://w.wallhaven.cc/full/dg/wallhaven-dglxqg.jpg',
    'https://w.wallhaven.cc/full/1k/wallhaven-1k57j1.jpg',
    'https://w.wallhaven.cc/full/49/wallhaven-49yzkk.jpg'
];

export default function Wallpaper() {
    return (
        <div>
            <h1 className="title">风景建筑</h1>
            <Flex gap={16} wrap="wrap" justify="space-around">

                <ImageComponent url={demoUrls[0]} />
                <ImageComponent url={demoUrls[1]} />
                <ImageComponent url={demoUrls[2]} />
                <ImageComponent url={demoUrls[3]} />

            </Flex>

            <h1 className="title">动漫人物</h1>
            <Flex gap={16} wrap="wrap" justify="space-around">
                <ImageComponent url={demoUrls[0]} />
                <ImageComponent url={demoUrls[1]} />
                <ImageComponent url={demoUrls[2]} />
                <ImageComponent url={demoUrls[3]} />
            </Flex>
        </div>
    )
}