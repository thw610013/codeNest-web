// src/components/HighlightText.tsx
import React from "react";
// 搜索高亮组件

interface HighlightTextProps {
    text: string;       // 要展示的原始文本
    keyword: string;    // 高亮的关键词
    color?: string;     // 高亮颜色，可选
}

const HighlightText: React.FC<HighlightTextProps> = ({ text, keyword, color = "yellow" }) => {
    if (!keyword) return <>{text}</>;
    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                regex.test(part) ? (
                    <mark
                        key={index}
                        style={{ backgroundColor: color, padding: 0 }}
                    >
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>
    );
};

export default HighlightText;