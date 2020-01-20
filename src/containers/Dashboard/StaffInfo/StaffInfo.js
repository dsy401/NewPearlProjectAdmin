import React, {Component,Fragment} from 'react'
import {GetStaff, AddStaff, DeleteStaff} from '../../../api/api'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Descriptions, Spin, Button} from 'antd'
import classes from './StaffInfo.css'
import StaffEditModal from "../../../components/UI/StaffEditModal/StaffEditModal";
import {connect} from 'react-redux'
import StaffAddModal from "../../../components/UI/StaffAddModal/StaffAddModal";
import GeneralConfirmModal from "../../../components/UI/GeneralConfirmModal/GeneralConfirmModal";

class StaffInfo extends Component{
    state={
        data:[],
        EditModalVisible: false,
        propsToModal: {
            name: "",
            role: "",
            role_cn:"",
            facebook:"",
            linkedin: "",
            id:"",
            wechat: "",
            image: "",
        },
        isLoading:false,
        AddModalVisible: false,
        DeleteModalVisible: false,
        DeletePerson: {
            name: "",
            id: ""
        }
    };

    componentDidMount = () =>{
        this.FetchStaff()
    };

    componentWillUnmount = ()=> {
        this.setState = (state) =>{
            return;
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.StaffInfoData !== this.props.StaffInfoData){
            this.setState({
                data: nextProps.StaffInfoData
            })
        }
    }

    FetchStaff = () =>{
        this.setState({isLoading: true})
        GetStaff().then(res=>{
            this.setState({isLoading: false},()=>{
                this.setState({
                    data: res.data
                })
            })
        }).catch(err=>{
            this.setState({isLoading: false})
            console.log(err)
        })
    }

    openEditModal = (obj) =>{
        this.setState({
            propsToModal: {
                name: obj.name,
                role: obj.role,
                role_cn:obj.role_cn,
                facebook: obj.facebook,
                linkedin: obj.linkedin,
                wechat: obj.wechat,
                image: obj.image,
                id: obj._id.$oid
            }
        },()=>{
            this.setState({
                EditModalVisible: true
            })
        })
    };

    hideEditModal = () =>{
            this.setState({
                EditModalVisible: false
            })
    }

    hideEditModalThenFetch= () =>{
        this.setState({
            EditModalVisible: false
        },()=>{
            this.FetchStaff()
        })
    }

    hideAddModal = () =>{
        this.setState({
            AddModalVisible: false
        })
    };


    openAddModal = () =>{
        this.setState({
            AddModalVisible: true
        })
    };

    AddStaffHandler = (data,cb) =>{
        this.setState({isLoading:true})
        AddStaff(data).then(res=>{
            this.setState({isLoading:false,data: res.data},()=>{
                cb()
            })
        }).catch(err=>{
            console.log(err)
        })
    };


    openDeleteModal = (obj) =>{
       this.setState({
           DeletePerson: {
               name: obj.name,
               id: obj._id.$oid
           }
       },()=>{
           this.setState({
               DeleteModalVisible: true
           })
       })
    };

    hideDeleteModal = () =>{
        this.setState({
            DeleteModalVisible: false
        })
    };

    DeleteHandler = () =>{
        this.setState({isLoading: true});
        DeleteStaff(this.state.DeletePerson.id).then(res=>{
            this.setState({
                data: res.data,
                isLoading:false,
                DeleteModalVisible: false
            })
        }).catch(err=>{
            console.log(err);
            this.setState({isLoading:false})
        })
    };



    render(){
        return (
            <Fragment>
                <DashboardBody title={this.props.name}>
                    <Spin style={{top:250}} tip="Loading..." spinning={this.state.isLoading}>
                        <Button onClick={this.openAddModal} style={{marginBottom:10}} type="primary">
                            Add Staff
                        </Button>
                        <div>
                            {this.state.data.map((s,i)=>{
                                return (
                                    <div key={i.toString()} className={classes.card}>
                                        <Descriptions  style={{paddingBottom:"10px",margin:10}} title={s.name} size='default'>
                                            <Descriptions.Item label="Role">{s.role}</Descriptions.Item>
                                            <Descriptions.Item label="职位">{s.role_cn}</Descriptions.Item>
                                            <Descriptions.Item label="Operation">
                                                <div>
                                                    <span style={{marginRight:10}} className={classes.edit} onClick={()=>{this.openDeleteModal(s)}}>Delete</span>
                                                    <span className={classes.edit} onClick={()=>{this.openEditModal(s)}}>Edit</span>
                                                </div>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="image"><a href={s.image}><img width={100} height={100} src={s.image} /></a></Descriptions.Item>
                                            <Descriptions.Item label="wechat"><a href={s.wechat}><img width={100} height={100} src={s.wechat} /></a></Descriptions.Item>
                                        </Descriptions>
                                    </div>
                                )
                            })}
                        </div>
                    </Spin>
                </DashboardBody>
                <StaffEditModal hideModalThenFetch={this.hideEditModalThenFetch} visible={this.state.EditModalVisible} hideModal={this.hideEditModal} values={this.state.propsToModal}/>
                <StaffAddModal visible={this.state.AddModalVisible} hideModal={this.hideAddModal} isLoading={this.state.isLoading} AddStaff={this.AddStaffHandler}/>
                <GeneralConfirmModal
                    title="Delete Confirmation"
                    visible={this.state.DeleteModalVisible}
                    confirm={this.DeleteHandler}
                    hideModal={this.hideDeleteModal}
                    text={`Are you sure to delete ${this.state.DeletePerson.name}`}
                    isLoading={this.state.isLoading}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        StaffInfoData: state.StaffInfoReducer
    }
};



export default connect(mapStateToProps)(StaffInfo)
