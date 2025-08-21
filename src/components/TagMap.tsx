// 标签映射表
export const tagMap: Record<
    string,
    { label: string; color: string }
> = {
    experience: { label: "经验", color: "geekblue" },
    diary: { label: "日记", color: "green" },
    study: { label: "学习记录", color: "volcano" },
    difficult: { label: "疑难杂症", color: "red" },
    share: { label: "技术分享", color: "purple" },
    other: { label: "其他", color: "default" },
};