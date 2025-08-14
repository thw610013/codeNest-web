import { useCallback } from 'react';
import { message } from 'antd';
import { createLikeRecord } from '../api/like_record_api'; // 替换成你的接口路径

/**
 * useLikeRecord - 通用点赞 Hook
 * @param {string|number} targetId - 被点赞对象 ID
 * @param {string|number} targetType - 点赞类型 1=文章, 2=题目, 3=工具, 4=网站
 */
export function useLikeRecord(
    targetId: string,
    targetType: "1" | "2" | "3" | "4",
    onSuccess?: () => void
) {
    const [messageApi, contextHolder] = message.useMessage();

    const handleLike = useCallback(() => {
        const lastLikeTime = localStorage.getItem(`lastLikeTime_${targetType}_${targetId}`);
        const now = Date.now();

        if (lastLikeTime && now - Number(lastLikeTime) < 3600 * 1000) {
            message.warning('每小时只能点赞一次哦！');
            return;
        }

        createLikeRecord({
            targetType,
            targetId: Number(targetId),
            isLike: "1"
        })
            .then(() => {
                messageApi.open({ type: 'success', content: '点赞成功' });
                localStorage.setItem(`lastLikeTime_${targetType}_${targetId}`, now.toString());
                if (onSuccess) onSuccess(); // 调用回调更新 likeCount
            })
            .catch(() => {
                messageApi.open({ type: 'warning', content: '点赞失败' });
            });
    }, [targetId, targetType, onSuccess, messageApi]);

    return { handleLike, contextHolder };
}