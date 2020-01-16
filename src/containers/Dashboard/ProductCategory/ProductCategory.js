import React, {Component, Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {connect} from 'react-redux'
import {FetchProductCategory} from "../../../redux/actions/ProductCategoryAction";
import {Card, Col, Row, Spin} from "antd";
import ProductCategoryEditModal from "../../../components/UI/ProductCategoryEditModal/ProductCategoryEditModal";
import {withRouter} from 'react-router-dom'
class ProductCategory extends Component{


    componentDidMount = () =>{
        this.props.FetchProductCategory()
    };

    componentWillUnmount = ()=> {
        this.setState = (state)=>{
            return;
        }
    };

    state = {
        ProductCategoryVisible: false,
        propsToModal: {
            name: "",
            name_cn:"",
            description: "",
            description_cn: "",
            image:""
        }
    };

    hideProductCategoryModal = () =>{
        this.setState({ProductCategoryVisible: false})
    };

    openProductCategoryModal= (obj) =>{
        this.setState({
            propsToModal:{
                name: obj.name,
                name_cn: obj.name_cn,
                description: obj.description,
                description_cn: obj.description_cn,
                id: obj._id.$oid,
                image: obj.image
            }
        },()=>{
            this.setState({ProductCategoryVisible:true})
        })
    };


    navigateTo =(path) =>{
        this.props.history.push(path)
    }


    render(){
        return (
            <Fragment>
                <DashboardBody title={this.props.name}>
                    <Spin style={{top:250}} tip="Loading..." spinning={this.props.Data.isLoading}>
                        <Row gutter={[0,20]}>
                            {this.props.Data.data.map((s,i)=>{
                                const path = "/dashboard/product/" + s._id.$oid
                                return (
                                    <Col key={i.toString()} span={8}>
                                        <Card
                                            title={s.name}  style={{ width: 300 }} extra={<a onClick={()=>{this.openProductCategoryModal(s)}}>Edit</a>}>
                                            <img onClick={()=>{this.navigateTo(path)}} style={{width:"100%",height:"150px",cursor:"pointer"}} alt="" src={`${s.image}`}/>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Spin>
                </DashboardBody>
                <ProductCategoryEditModal visible={this.state.ProductCategoryVisible} hideModal={this.hideProductCategoryModal} values={this.state.propsToModal}/>
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



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProductCategory))
