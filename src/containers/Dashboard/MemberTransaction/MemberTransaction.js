import React, {Component, Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Button, Card, Col, Icon, Row,Table} from "antd";
import {GetMemberTransaction} from "../../../api/api";
import moment from "moment";

class MemberTransaction extends Component{

    columns = [
        {
            title: "Date time",
            dataIndex: "date_time",
            key: "date_time"
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount"
        },
        {
            title: "Actual Amount",
            dataIndex: "pay_amount",
            key: "pay_amount"
        },
        {
            title: "Point Used",
            dataIndex: "used_point",
            key: "used_point"
        },
        {
            title: "Before Point",
            dataIndex: "before_point",
            key: "before_point"
        },
        {
            title: "After Point",
            dataIndex: "after_point",
            key: "after_point"
        }
    ];


    GoBackClick = () =>{
        this.props.history.goBack()
    };

    state = {
        data: [],
        loading:false
    };

    componentWillUnmount = () => {
        this.setState = state =>{
            return ;
        }
    }

    componentDidMount = () => {
        this.setState({loading:true})
        GetMemberTransaction(this.props.match.params.memberId).then(res=>{
            this.setState({
                loading: false,
                data: res.data.map(s=>{
                    s.date_time = moment(s.date_time.$date).format('lll');
                    return s;
                })
            })
        }).catch(err=>{
            this.setState({
                loading:false
            });
            console.log(err)
        })
    };

    render(){

        return (
            <Fragment>
                <DashboardBody title={this.props.name}>
                    <Row style={{marginBottom:20}}>
                        <Col span={8}>
                            <Button onClick={this.GoBackClick} type="primary">
                                <Icon type="left" />
                                Go back
                            </Button>
                        </Col>
                        <Col style={{marginTop: 10}} span={24}>
                            <Table loading={this.state.loading} columns={this.columns} dataSource={this.state.data}/>
                        </Col>
                    </Row>
                </DashboardBody>
            </Fragment>
        )
    }
}


export default MemberTransaction
