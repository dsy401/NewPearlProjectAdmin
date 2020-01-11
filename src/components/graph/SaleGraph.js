import {ChartCard,Field,yuan} from 'ant-design-pro/lib/Charts'
import Trend from 'ant-design-pro/lib/Trend'
import {Icon,Tooltip} from 'antd'
import numeral from 'numeral';
import React,{Component} from 'react'

class SaleGraph extends Component{
    render(){
        return (
            <ChartCard
                title="销售额"
                action={
                    <Tooltip title="指标说明">
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                total={() => <span dangerouslySetInnerHTML={{ __html: yuan(126560) }} />}
                footer={<Field label="日均销售额" value={numeral(12423).format('0,0')} />}
                contentHeight={46}
            >
                            <span>
                              周同比
                              <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                                12%
                              </Trend>
                            </span>
                <span style={{ marginLeft: 16 }}>
                              日环比
                              <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                                11%
                              </Trend>
                            </span>
            </ChartCard>
        )
    }
}


export default SaleGraph
