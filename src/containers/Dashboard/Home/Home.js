import React,{Component} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Row,Col} from 'antd'
import SaleGraph from "../../../components/graph/SaleGraph";
import ProductNumGraph from "../../../components/graph/ProductNumGraph";
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
                    </Row>
                </div>
            </DashboardBody>
        )
    }

}
export default Home
