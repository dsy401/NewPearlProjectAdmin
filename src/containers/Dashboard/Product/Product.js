import React, {Component, Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {AddProduct, FirstProductCategory, GetProductsById} from "../../../api/api";
import {withRouter} from 'react-router-dom'
import {Card, Col, Row, Spin,Input,Button} from "antd";
import ProductAddModal from "../../../components/UI/AddProductModal/AddProductModal";
const {Search} = Input;
class Product extends Component{

    state={
        title: "",
        isLoading: false,
        data:[],
        dataShown: [],
        searchValue: "",
        AddProductModalVisible: false,
        EditProductModalVisible: false,
        passToModal: {
            id: "",
            code:"",
            image: "",
            color:"",
            environment:"",
            finish:"",
            material:"",
            price:"",
            shape:"",
            size: "",
            style: "",
            type: "",
            unit: "",
            color_cn: "",
            environment_cn: "",
            finish_cn: "",
            material_cn: "",
            price_cn: "",
            shape_cn:"",
            size_cn:"",
            style_cn:"",
            type_cn:"",
            unit_cn:""
        }
    };


    hideProductAddModal = () =>{
        this.setState({AddProductModalVisible: false})
    };

    openProductAddModal = () =>{
        this.setState({AddProductModalVisible: true})
    };

    AddProductHandler = (data) =>{
        this.setState({isLoading:true})
        AddProduct(data).then(res=>{
            this.setState({isLoading:false},()=>{
                this.setState({
                    data: res.data,
                    dataShown: res.data,
                    AddProductModalVisible: false
                })
            })
        }).catch(err=>{
            console.log(err)
            this.setState({isLoading:false})
        })
    }

    openProductEditModal = (obj) =>{
        this.setState({
            passToModal: {
                id: obj._id.$oid,
                code:obj.code,
                image: obj.image,
                color:obj.color,
                environment:obj.environment,
                finish:obj.finish,
                material:obj.material,
                price:obj.price,
                shape:obj.shape,
                size: obj.size,
                style: obj.style,
                type: obj.type,
                unit: obj.unit,
                color_cn: obj.color_cn,
                environment_cn: obj.environment_cn,
                finish_cn: obj.finish_cn,
                material_cn: obj.material_cn,
                price_cn: obj.price_cn,
                shape_cn:obj.shape_cn,
                size_cn:obj.size_cn,
                style_cn:obj.style_cn,
                type_cn:obj.type_cn,
                unit_cn:obj.unit_cn
            },
            EditProductModalVisible:true
        })
    }

    componentWillUnmount =() => {
        this.setState = state=>{
            return;
        }
    };

    SearchOnChangeHandler = (e) =>{
        const searchValue = e.target.value;
        const result = this.state.data.filter(s=>s.code.toLowerCase().includes(searchValue.toLowerCase()))
        this.setState({
            dataShown: result,
            searchValue: searchValue
        })
    };

    componentDidMount = () =>{
        this.setState({isLoading:true})
        const productCategoryId = this.props.match.params.productCategoryId
        FirstProductCategory(productCategoryId).then(res=>{
            this.setState({
                title: res.data.name
            },()=>{
                GetProductsById(productCategoryId).then(resp=>{
                    this.setState({isLoading:false},()=>{
                        this.setState({
                            data:resp.data,
                            dataShown: resp.data
                        })
                    })
                }).catch(error=>{
                    this.setState({isLoading:false})
                    console.log(error)
                })
            })
        }).catch(err=>{
            this.props.history.push('/dashboard/productcategory')
        })
    };

    render(){
        return (
            <Fragment>
                <DashboardBody title={this.state.title}>
                    <Spin style={{top:250}} tip="Loading..." spinning={this.state.isLoading}>
                        <Search
                            placeholder="Search By Code or Name..."
                            onChange={this.SearchOnChangeHandler}
                            style={{ width: 300,marginBottom:20,marginRight:20 }}
                            value={this.state.searchValue}
                        />
                        <Button onClick={this.openProductAddModal} type={"primary"}>Add Product</Button>

                        <Row gutter={[0,20]}>
                            {this.state.dataShown.map((s,i)=>{
                                return (
                                    <Col key={i.toString()} span={8}>
                                        <Card
                                            title={s.code}  style={{ width: 300 }} extra={<a>Edit</a>}>
                                            <img style={{width:"100%",height:"150px"}} alt="" src={`${s.image}`}/>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Spin>
                </DashboardBody>
                <ProductAddModal
                    visible={this.state.AddProductModalVisible} productCategoryId={this.props.match.params.productCategoryId}
                    isLoading={this.state.isLoading} hideModal={this.hideProductAddModal} AddProduct={this.AddProductHandler}
                />
            </Fragment>
        )
    }
}

export default withRouter(Product)
