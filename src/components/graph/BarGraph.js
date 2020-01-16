import { Bar } from 'ant-design-pro/lib/Charts';
import React from 'react'
const salesData = [];
for (let i = 0; i < 12; i += 1) {
    salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
    });
}

const BarGraph = () => <Bar height={200} title="销售额趋势" data={salesData} />
export default BarGraph
