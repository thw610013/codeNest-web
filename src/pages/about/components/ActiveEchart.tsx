import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

interface CalendarHeatmapProps {
    year?: string;
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ year }) => {
    const selectedYear = year || new Date().getFullYear().toString();
    // 默认显示当前月份
    const currentMonth = new Date().getMonth() + 1;
    const [month, setMonth] = useState<string>(currentMonth.toString().padStart(2, '0'));

    // 生成全年虚拟数据
    const getVirtualData = (year: string): [string, number][] => {
        const date = +echarts.time.parse(`${year}-01-01`);
        const end = +echarts.time.parse(`${year}-12-31`);
        const dayTime = 3600 * 24 * 1000;
        const data: [string, number][] = [];
        for (let time = date; time <= end; time += dayTime) {
            data.push([
                echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
                Math.floor(Math.random() * 10000),
            ]);
        }
        return data;
    };

    const allData = useMemo(() => getVirtualData(selectedYear), [selectedYear]);

    // 筛选当前月份数据
    const currentMonthData = allData.filter(([dateStr]) => dateStr.slice(5, 7) === month);

    const option = useMemo(() => ({
        tooltip: {
            show: true,
            formatter: (params: { data: [string, number] }) => {
                const [date, value] = params.data;
                return `${date}: ${value}篇`;
            },
        },
        visualMap: {
            show: false,
            min: 0,
            max: 10000,
            inRange: { color: ['#efefef', 'lightgreen'] },
        },
        calendar: {
            range: `${selectedYear}-${month}`,
            left: 20,
            cellSize: ['auto', 20],
            yearLabel: { show: false },
            monthLabel: { nameMap: 'en' },
        },
        series: [
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: currentMonthData,
                animation: true, // 动画开启
                animationDuration: 500, // 动画时长
                animationEasing: 'cubicOut',
            },
        ],
    }), [selectedYear, month, currentMonthData]);

    return (
        <div>
            {/* 月份选择 */}
            <div style={{ marginBottom: 10 }}>
                {Array.from({ length: 12 }, (_, i) => {
                    const m = String(i + 1).padStart(2, '0');
                    return (
                        <button
                            key={m}
                            onClick={() => setMonth(m)}
                            style={{
                                marginRight: 4,
                                padding: '4px 8px',
                                backgroundColor: m === month ? 'lightgreen' : '#eee',
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer',
                                transition: 'all 0.3s', // 按钮切换过渡
                            }}
                        >
                            {m}月
                        </button>
                    );
                })}
            </div>

            <ReactECharts option={option} style={{ height: 250, width: '100%' }} />
        </div>
    );
};

export default CalendarHeatmap;