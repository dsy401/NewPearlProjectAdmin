import React, {Component, Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {connect} from 'react-redux'
import {FetchProductCategory} from "../../../redux/actions/ProductCategoryAction";
import {Card, Col, Row, Spin} from "antd";
import config from "../../../config";
import classes from "../Product/Product.css";
class Product extends Component{


    componentDidMount = () =>{
        this.props.FetchProductCategory()
    };

    componentWillUnmount = ()=> {
        this.setState = (state)=>{
            return;
        }
    };

    render(){
        return (
            <Fragment>
                <DashboardBody title={this.props.name}>
                    <Spin style={{top:250}} tip="Loading..." spinning={this.props.Data.isLoading}>
                        <Row gutter={[0,20]}>
                            {this.props.Data.data.map(s=>{
                                return (
                                    <Col span={8}>
                                        <Card
                                            title={s.name}  style={{ width: 300 }} extra={<a>Edit</a>}>
                                            <img style={{width:"100%",height:"150px"}} alt="" src={`${config.Host}${s.image}`}/>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Spin>
                </DashboardBody>
            </Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        Data: state.ProductCategoryReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        FetchProductCategory: ()=> dispatch(FetchProductCategory())
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(Product)
