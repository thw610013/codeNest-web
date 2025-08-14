import React, { useCallback } from 'react';
import { FloatButton, message } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { createLikeRecord } from '../api/like_record_api';

interface LikeButtonProps {
    targetId: string | number;
    targetType: "1" | "2" | "3" | "4";
    onSuccess?: () => void;
    style?: React.CSSProperties; // 可选自定义样式
}

/**
 * LikeButton - 通用点赞组件
 * 使用示例：
 * <LikeButton targetId={id} targetType="2" onSuccess={() => setLikeCount(prev => prev + 1)} />
 */
const LikeButton: React.FC<LikeButtonProps> = ({ targetId, targetType, onSuccess, style }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const handleLike = useCallback(() => {
        const lastLikeTime = localStorage.getItem(`lastLikeTime_${targetType}_${targetId}`);
        const now = Date.now();

        if (lastLikeTime && now - Number(lastLikeTime) < 3600 * 1000) {
            messageApi.warning('每小时只能点赞一次哦！');
            return;
        }

        createLikeRecord({
            targetType,
            targetId: Number(targetId),
            isLike: "1"
        })
            .then(() => {
                messageApi.success('点赞成功');
                localStorage.setItem(`lastLikeTime_${targetType}_${targetId}`, now.toString());
                if (onSuccess) onSuccess(); // 更新父组件状态
            })
            .catch(() => {
                messageApi.warning('点赞失败');
            });
    }, [targetId, targetType, onSuccess, messageApi]);

    return (
        <>
            {contextHolder}
            <FloatButton
                shape="circle"
                type="primary"
                icon={<LikeOutlined />}
                style={{ insetInlineEnd: 94, ...style }}
                onClick={handleLike}
            />
        </>
    );
};

export default LikeButton;