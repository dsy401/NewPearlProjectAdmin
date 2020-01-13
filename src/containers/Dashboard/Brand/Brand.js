import React, {Component} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Card,Row,Col} from 'antd'
import classes from './Brand.css'
import {GetBrands} from '../../../api/api'
const Host = "http://localhost:5000";

class Brand extends Component{

    state = {
        data: []
    }

    componentDidMount = () =>{
        GetBrands().then(res=>{
            this.setState({
                data:res.data
            })
        }).catch(err=>{

        })
    };


    componentWillUnmount = ()=> {
        this.setState = (state) =>{
            return;
        }
    }

    render(){
        return (
            <DashboardBody title={this.props.name}>
                <Row gutter={[0,20]}>
                    {this.state.data.map(s=>{
                        return (
                            <Col span={8}>
                                <Card
                                    title={s.name}  style={{ width: 300 }} extra={<a>Edit</a>}>
                                    <img style={{width:"100%",height:"150px"}} alt="" src={`${Host}${s.image}`}/>
                                </Card>
                            </Col>

                        )
                    })}
                    <Col span={8}>
                        <div className={classes.add}/>
                    </Col>
                </Row>
            </DashboardBody>
        )
    }
}

export default Brand
