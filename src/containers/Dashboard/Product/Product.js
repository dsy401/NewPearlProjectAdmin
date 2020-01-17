import React, {Component, Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {FirstProductCategory,GetProductsById} from "../../../api/api";
import {withRouter} from 'react-router-dom'
import {Card, Col, Row, Spin,Input} from "antd";
const {Search} = Input
class Product extends Component{

    state={
        title: "",
        isLoading: false,
        data:[],
        dataShown: [],
        searchValue: ""
    };

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
    }

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
            <DashboardBody title={this.state.title}>
                <Spin style={{top:250}} tip="Loading..." spinning={this.state.isLoading}>
                    <Search
                        placeholder="Search By Code or Name..."
                        onChange={this.SearchOnChangeHandler}
                        style={{ width: 300,marginBottom:20 }}
                        value={this.state.searchValue}
                    />
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
        )
    }
}

export default withRouter(Product)
