import React,{Component} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Row,Col} from 'antd'
import SaleGraph from "../../../components/graph/SaleGraph";
import ProductNumGraph from "../../../components/graph/ProductNumGraph";
import BarGraph from "../../../components/graph/BarGraph";
import TimeLineGraph from "../../../components/graph/TimeLineGraph";
class Home extends Component{
    render(){
        return (
            <DashboardBody title={this.props.name}>
                <div>
                    <Row type="flex" justify="space-between">
                        <Col span={5}>
                            <SaleGraph/>
                        </Col>
                        <Col span={5}>
                            <SaleGraph/>
                        </Col>
                        <Col span={5}>
                            <SaleGraph/>
                        </Col>
                        <Col span={5}>
                            <ProductNumGraph/>
                        </Col>
                        <Col style={{marginTop: 20}} span={24}>
                            <BarGraph/>
                        </Col>
                        <Col style={{marginTop: 20}} span={24}>
                            <TimeLineGraph/>
                        </Col>
                    </Row>

                </div>
            </DashboardBody>
        )
    }

}
export default Home
