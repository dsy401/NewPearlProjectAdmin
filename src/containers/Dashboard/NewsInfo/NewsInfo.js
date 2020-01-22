import React,{Component,Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Col, Row, Spin} from "antd";
import {DeleteNews, GetNews} from "../../../api/api";
import GeneralConfirmModal from "../../../components/UI/GeneralConfirmModal/GeneralConfirmModal";
import {withRouter} from 'react-router-dom'
class NewsInfo extends Component{
    state = {
        isLoading: false,
        data:[],
        DeleteModalVisible: false,
        DeleteNewsTitleId: ""
    };


    componentDidMount = () =>{
        this.setState({isLoading:true})
        GetNews().then(res=>{
            this.setState({
                isLoading:false,
                data: res.data
            })
        }).catch(err=>{
            console.log(err)
            this.setState({isLoading:false})
        })
    };

    DeleteHandler = () =>{
        this.setState({isLoading:true})
        DeleteNews(this.state.DeleteNewsTitleId).then(res=>{
            this.setState({
                isLoading:false,
                data: res.data,
                DeleteModalVisible: false
            })
        }).catch(err=>{
            console.log(err)
            this.setState({isLoading:false})
        })
    };

    DeleteModalOpen = (id) =>{
        this.setState({
            DeleteNewsTitleId: id,
            DeleteModalVisible: true
        })
    }

    componentWillUnmount = ()=> {
        this.setState = state=>{
            return;
        }
    };

    EditClickHandler = (id) =>{
        const href = '/dashboard/newsedit/' + id
        this.props.history.push(href)
    }

    render() {
        return (
            <DashboardBody title={this.props.name}>
                <Spin style={{top:250}} tip="Loading..." spinning={this.state.isLoading}>
                    {this.state.data.map((s,i)=>{
                        return (
                            <Row key={i.toString()} style={{marginBottom:30}}>
                                <Col span={2} style={{marginRight:20}}>
                                    <a onClick={()=>{this.EditClickHandler(s._id.$oid)}}>Edit</a>
                                    <br/>
                                    <a onClick={()=>{this.DeleteModalOpen(s._id.$oid)}}>Delete</a>
                                </Col>
                                <Col style={{marginRight:20}} span={4}>
                                    <img style={{width:"100%",height:"150px"}} src={s.image} alt=""/>
                                </Col>
                                <Col span={14}>
                                    <label><strong>Title</strong></label>
                                    <p>{s.title}</p>
                                    <label><strong>标题</strong></label>
                                    <p>{s.title_cn}</p>
                                </Col>
                            </Row>
                        )
                    })}
                </Spin>
                <GeneralConfirmModal
                    title="Delete Confirmation"
                    visible={this.state.DeleteModalVisible}
                    confirm={this.DeleteHandler}
                    hideModal={()=>{this.setState({DeleteModalVisible: false})}}
                    isLoading={this.state.isLoading}
                    text="Are you sure to Delete?"
                />
            </DashboardBody>
        )
    }
}

export default withRouter(NewsInfo)
