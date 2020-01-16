import React, {Component, Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {FirstProductCategory} from "../../../api/api";
import {withRouter} from 'react-router-dom'

class Product extends Component{

    state={
        title: ""
    };

    componentDidMount = () =>{
        const productCategoryId = this.props.match.params.productCategoryId
        FirstProductCategory(productCategoryId).then(res=>{
            this.setState({
                title: res.data.name
            },()=>{

            })
        }).catch(err=>{
            this.props.history.push('/dashboard/productcategory')
        })
    };

    render(){
        return (
            <DashboardBody title={this.state.title}>

            </DashboardBody>
        )
    }
}

export default withRouter(Product)
