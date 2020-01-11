import React,{Component} from 'react'
import { ChartCard, Field, MiniBar } from 'ant-design-pro/lib/Charts';

import { Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import moment from 'moment'
const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
    });
}
class ProductNumGraph extends Component{
    render(){
        return (
            <ChartCard
                title="访问量"
                action={
                    <Tooltip title="指标说明">
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                total={numeral(8846).format('0,0')}
                footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                contentHeight={46}
            >
                <MiniBar height={46} data={visitData} />
            </ChartCard>
        )
    }
}

export default ProductNumGraph
