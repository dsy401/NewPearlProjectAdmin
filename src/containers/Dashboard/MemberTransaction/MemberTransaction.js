import React, {Component, Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Button, Card, Col, Icon, Row,Table} from "antd";
import {GetMemberTransaction} from "../../../api/api";
import moment from "moment";

class MemberTransaction extends Component{

    columns = [
        {
            title: "Use or Add",
            dataIndex: "add_or_use",
            key: "add_or_use"
        },
        {
            title: "Point",
            dataIndex: "point",
            key: "point"
        },
        {
            title: "Date time",
            dataIndex: "date_time",
            key: "date_time"
        }
    ];


    GoBackClick = () =>{
        this.props.history.goBack()
    };

    state = {
        data: [],
        loading:false
    };

    componentDidMount = () => {
        this.setState({loading:true})
        GetMemberTransaction(this.props.match.params.memberId).then(res=>{
            this.setState({
                loading: false,
                data: res.data.map(s=>{
                    return {key: s._id.$oid,point: s.point,add_or_use: s.add_or_use?"Add":"Use",date_time:moment(s.date_time.$date).format('lll')}
                })
            })
        }).catch(err=>{
            this.setState({
                loading:false
            })
            console.log(err)
        })
    }

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
