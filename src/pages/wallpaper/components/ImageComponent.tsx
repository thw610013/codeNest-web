import React from 'react';
import {
    DownloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    UndoOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, Space } from 'antd';

interface ImageComponentProps {
    url: string;
    width?: number;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ url, width = 500 }) => {
    const onDownload = () => {
        const suffixIndex = url.lastIndexOf('.');
        const suffix = suffixIndex !== -1 ? url.slice(suffixIndex) : '';
        const filename = Date.now() + suffix;

        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const blobUrl = URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(blobUrl);
                link.remove();
            });
    };

    return (
        <Image.PreviewGroup
            preview={{
                toolbarRender: (
                    _,
                    {
                        transform: { scale },
                        actions: {
                            onFlipY,
                            onFlipX,
                            onRotateLeft,
                            onRotateRight,
                            onZoomOut,
                            onZoomIn,
                            onReset,
                        },
                    },
                ) => (
                    <Space size={12} className="toolbar-wrapper">
                        <DownloadOutlined onClick={onDownload} />
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                        <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                        <UndoOutlined onClick={onReset} />
                    </Space>
                ),
            }}
        >
            <Image src={url} width={width} />
        </Image.PreviewGroup>
    );
};

export default ImageComponent;